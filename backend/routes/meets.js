const express = require('express');
const { google } = require('googleapis');
const router = express.Router();
const Creator = require('../models/Creator');
const User = require('../models/User');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const calendar = google.calendar({
  version: 'v3',
  auth: oauth2Client
});

// User requests a meet
router.post('/request', async (req, res) => {
  try {
    const { emotion, scheduledTime } = req.body;
    const userId = req.user._id;
    
    // Find available creators
    const meetTime = new Date(scheduledTime);
    const day = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][meetTime.getDay()];
    const timeStr = meetTime.toTimeString().slice(0, 5);
    
    const availableCreators = await Creator.find({
      'meetPreferences.availableEmotions': emotion,
      'meetPreferences.availabilitySlots': {
        $elemMatch: {
          day: day.toLowerCase(),
          startTime: { $lte: timeStr },
          endTime: { $gte: timeStr }
        }
      },
      'meetPreferences.upcomingMeets': {
        $not: {
          $elemMatch: {
            scheduledTime: {
              $gte: new Date(meetTime.getTime() - 30 * 60000),
              $lte: new Date(meetTime.getTime() + 30 * 60000)
            },
            status: { $ne: 'rejected' }
          }
        }
      }
    }).limit(5);
    
    if (availableCreators.length === 0) {
      return res.status(404).json({ message: 'No creators available for this time' });
    }
    
    // Create Google Meet event
    const event = {
      summary: `Emotional Support: ${emotion}`,
      description: `Support session for ${emotion} emotion`,
      start: { dateTime: scheduledTime, timeZone: 'UTC' },
      end: { dateTime: new Date(new Date(scheduledTime).getTime() + 30 * 60000).toISOString(), timeZone: 'UTC' },
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' }
        }
      },
      attendees: [
        { email: req.user.email },
        { email: availableCreators[0].email }
      ]
    };
    
    const { data } = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1
    });
    
    // Add meet to creator's upcoming meets
    const meetData = {
      userId,
      emotion,
      scheduledTime,
      status: 'pending',
      meetLink: data.hangoutLink
    };
    
    await Creator.findByIdAndUpdate(availableCreators[0]._id, {
      $push: { 'meetPreferences.upcomingMeets': meetData }
    });
    
    res.json({ meetLink: data.hangoutLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error scheduling meet' });
  }
});

// Creator responds to meet request
router.patch('/:meetId/:action', async (req, res) => {
  try {
    const { meetId, action } = req.params;
    const creatorId = req.user._id;
    
    if (!['accept', 'reject'].includes(action)) {
      return res.status(400).json({ message: 'Invalid action' });
    }
    
    await Creator.findOneAndUpdate(
      { 
        _id: creatorId,
        'meetPreferences.upcomingMeets._id': meetId 
      },
      { 
        $set: { 
          'meetPreferences.upcomingMeets.$.status': action === 'accept' ? 'accepted' : 'rejected'
        } 
      }
    );
    
    res.json({ message: `Meet ${action}ed` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating meet status' });
  }
});

module.exports = router;