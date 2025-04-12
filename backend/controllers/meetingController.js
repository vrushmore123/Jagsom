// backend/controllers/meetingController.js
const meeting = [
    { id: 1, title: 'Depression', description: 'Articles and resources related to overcoming depression.' },
    { id: 2, title: 'Anxiety', description: 'Support and resources for managing anxiety.' },
  ];
  
  exports.getMeeting = (req, res) => {
    res.status(200).json(meeting);
  };
  