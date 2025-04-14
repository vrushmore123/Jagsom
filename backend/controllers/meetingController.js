const { google } = require("googleapis");
const Creator = require("../models/creatorModel");
const User = require("../models/userModel");
const Meeting = require("../models/meetingmodel");

// Set up OAuth2
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

const requestSupportMeeting = async (req, res) => {
  try {
    const { userId, emotion, preferredTime } = req.body;

    // 1. Validate preferredTime is in the future
    if (new Date(preferredTime) < new Date()) {
      return res.status(400).json({ message: "Meeting time must be in the future" });
    }

    // 2. Find available creators (prioritize those with higher ratings)
    const creators = await Creator.find({
      availableForSupport: true,
      supportEmotions: { $in: [emotion] },
      currentStatus: 'online'
    }).sort({ rating: -1, supportCount: 1 }); // Higher rating first, then fewer support counts

    if (creators.length === 0) {
      return res.status(404).json({ message: "No available creators for this emotion" });
    }

    // 3. Enhanced availability checking
    const meetingTime = new Date(preferredTime);
    const dayOfWeek = meetingTime.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
    
    const availableCreators = creators.filter(creator => {
      return creator.availability.some(slot => {
        if (slot.day !== dayOfWeek) return false;
        
        const [startHour, startMin] = slot.startTime.split(':').map(Number);
        const [endHour, endMin] = slot.endTime.split(':').map(Number);
        
        const meetingHour = meetingTime.getHours();
        const meetingMin = meetingTime.getMinutes();
        
        return (
          (meetingHour > startHour || 
          (meetingHour === startHour && meetingMin >= startMin)) &&
          (meetingHour < endHour || 
          (meetingHour === endHour && meetingMin <= endMin))
        );
      });
    });

    if (availableCreators.length === 0) {
      return res.status(404).json({ 
        message: "No creators available for this time slot",
        suggestion: "Please try a different time or check back later" 
      });
    }

    // 4. Select the best creator (first in the sorted list)
    const creator = availableCreators[0];
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 5. Create Google Calendar Event
    const event = {
      summary: `Emotion Support: ${emotion}`,
      description: `Emotional support session for ${emotion} between ${user.name} and ${creator.name}`,
      start: {
        dateTime: new Date(preferredTime).toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: new Date(new Date(preferredTime).getTime() + 30 * 60000).toISOString(),
        timeZone: "Asia/Kolkata",
      },
      attendees: [{ email: user.email }, { email: creator.email }],
      conferenceData: {
        createRequest: {
          requestId: `emotion-support-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1,
    });

    const meetLink = response.data?.conferenceData?.entryPoints?.find(
      ep => ep.entryPointType === "video"
    )?.uri;

    // 6. Save meeting and update creator status
    const meeting = new Meeting({
      userId,
      creatorId: creator._id,
      emotion,
      meetLink,
      scheduledTime: preferredTime,
      status: 'scheduled'
    });
    await meeting.save();

    // Update creator status
    await Creator.findByIdAndUpdate(creator._id, {
      currentStatus: 'in-meeting',
      $inc: { supportCount: 1 }
    });

    res.status(201).json({
      message: "Meeting scheduled successfully",
      meetLink,
      meetingId: meeting._id,
      creatorName: creator.name,
      scheduledTime: preferredTime,
      nextSteps: "The meeting link has been shared with both parties via email"
    });

  } catch (error) {
    console.error("Meeting request error:", error);
    res.status(500).json({ 
      message: "Failed to schedule support meeting",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const updateCreatorAvailability = async (req, res) => {
  try {
    const { creatorId, availableForSupport, supportEmotions, availability } = req.body;
    
    const updateData = { 
      availableForSupport,
      currentStatus: availableForSupport ? 'online' : 'offline'
    };
    
    if (supportEmotions) updateData.supportEmotions = supportEmotions;
    if (availability) updateData.availability = availability;

    const creator = await Creator.findByIdAndUpdate(
      creatorId,
      updateData,
      { new: true }
    );

    res.json({
      message: "Creator availability updated",
      creator: {
        _id: creator._id,
        availableForSupport: creator.availableForSupport,
        supportEmotions: creator.supportEmotions,
        availability: creator.availability,
        currentStatus: creator.currentStatus
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to update availability",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const getCreatorMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({ creatorId: req.params.creatorId })
      .populate('userId', 'name email')
      .sort({ scheduledTime: 1 });
    
    res.json(meetings.map(meeting => ({
      _id: meeting._id,
      user: meeting.userId,
      emotion: meeting.emotion,
      meetLink: meeting.meetLink,
      scheduledTime: meeting.scheduledTime,
      status: meeting.status
    })));
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to fetch meetings",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const getCreatorDetails = async (req, res) => {
  try {
    const creator = await Creator.findById(req.params.creatorId)
      .select('-password');
    
    if (!creator) {
      return res.status(404).json({ message: "Creator not found" });
    }
    
    res.json({
      _id: creator._id,
      name: creator.name,
      email: creator.email,
      availableForSupport: creator.availableForSupport,
      supportEmotions: creator.supportEmotions,
      availability: creator.availability,
      currentStatus: creator.currentStatus,
      rating: creator.rating,
      supportCount: creator.supportCount
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to fetch creator details",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const updateMeetingStatus = async (req, res) => {
  try {
    const { meetingId, status } = req.body;
    
    if (!['scheduled', 'in-progress', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    
    const meeting = await Meeting.findByIdAndUpdate(
      meetingId,
      { status },
      { new: true }
    ).populate('creatorId', 'currentStatus');
    
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    // Update creator status if meeting is completed
    if (status === 'completed') {
      await Creator.findByIdAndUpdate(meeting.creatorId._id, {
        currentStatus: 'online'
      });
    }

    res.json({ 
      message: "Meeting status updated successfully",
      meeting: {
        _id: meeting._id,
        status: meeting.status,
        updatedAt: meeting.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to update meeting status",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const getUserMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({ userId: req.params.userId })
      .populate('creatorId', 'name email')
      .sort({ scheduledTime: 1 });
    
    res.json(meetings.map(meeting => ({
      _id: meeting._id,
      creator: meeting.creatorId,
      emotion: meeting.emotion,
      meetLink: meeting.meetLink,
      scheduledTime: meeting.scheduledTime,
      status: meeting.status
    })));
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to fetch user meetings",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  requestSupportMeeting,
  updateCreatorAvailability,
  getCreatorMeetings,
  getCreatorDetails,
  updateMeetingStatus,
  getUserMeetings
};