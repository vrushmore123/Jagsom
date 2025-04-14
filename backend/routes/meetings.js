const express = require("express");
const { google } = require( 'googleapis');
const Creator = require('../models/creatorModel.js');
const User = require('../models/userModel.js');

const router = express.Router();
const calendar = google.calendar('v3');

// Configure Google OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

// Create meeting request
router.post('/', async (req, res) => {
  try {
    const { emotion, dateTime, userId } = req.body;
    
    // Find available creators
    const creators = await Creator.find({
      availableForSupport: true,
      supportEmotions: emotion,
      'availability.day': new Date(dateTime).toLocaleString('en-US', { weekday: 'long' }).toLowerCase(),
      currentStatus: 'online'
    });

    if (creators.length === 0) {
      return res.status(404).json({ message: 'No creators available' });
    }

    // Simple matching - could be enhanced
    const matchedCreator = creators[0];
    
    // Create meeting record
    const newMeeting = {
      userId,
      emotion,
      dateTime: new Date(dateTime),
      status: 'pending'
    };

    // Update creator's upcoming meetings
    await Creator.findByIdAndUpdate(
      matchedCreator._id,
      { $push: { upcomingMeetings: newMeeting } }
    );

    // Update user's upcoming meetings
    await User.findByIdAndUpdate(
      userId,
      { $push: { 
        upcomingMeetings: {
          ...newMeeting,
          creatorId: matchedCreator._id
        }
      }}
    );

    res.json({ 
      message: 'Meeting request sent', 
      creator: matchedCreator.name 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update meeting status (accept/reject)
router.put('/:id', async (req, res) => {
  try {
    const { action } = req.body;
    const meetingId = req.params.id;

    // Find and update meeting in creator's record
    const creator = await Creator.findOneAndUpdate(
      { 'upcomingMeetings._id': meetingId },
      { $set: { 'upcomingMeetings.$.status': action } },
      { new: true }
    );

    if (!creator) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    // If accepted, create Google Meet
    if (action === 'accepted') {
      const meeting = creator.upcomingMeetings.find(m => m._id.equals(meetingId));
      
      const event = {
        summary: `Emotion Support - ${meeting.emotion}`,
        description: `Virtual meeting for ${meeting.emotion} support`,
        start: { dateTime: meeting.dateTime, timeZone: 'UTC' },
        end: { dateTime: new Date(meeting.dateTime.getTime() + 30*60000), timeZone: 'UTC' },
        conferenceData: {
          createRequest: { requestId: meetingId.toString() }
        }
      };

      const { data } = await calendar.events.insert({
        auth: oauth2Client,
        calendarId: 'primary',
        resource: event,
        conferenceDataVersion: 1
      });

      const meetLink = data.hangoutLink;

      // Update both creator and user with meet link
      await Creator.updateOne(
        { 'upcomingMeetings._id': meetingId },
        { $set: { 'upcomingMeetings.$.meetLink': meetLink } }
      );

      await User.updateOne(
        { 'upcomingMeetings._id': meetingId },
        { $set: { 'upcomingMeetings.$.meetLink': meetLink, 'upcomingMeetings.$.status': 'accepted' } }
      );

      return res.json({ meetLink });
    }

    // If rejected, update user's record
    await User.updateOne(
      { 'upcomingMeetings._id': meetingId },
      { $set: { 'upcomingMeetings.$.status': 'rejected' } }
    );

    res.json({ message: `Meeting ${action}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;