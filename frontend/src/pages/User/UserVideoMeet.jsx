import { useState, useEffect } from 'react';
import { Calendar, Clock, Loader, Heart, Users, Video } from 'lucide-react';
import './UserVideoMeet.css'; // Import the CSS file

const UserVideoMeet = () => {
  const [emotion, setEmotion] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [availableCreators, setAvailableCreators] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [meetingStatus, setMeetingStatus] = useState(null);

  const emotionOptions = [
    { name: 'sad', icon: '😢' },
    { name: 'anxious', icon: '😰' },
    { name: 'angry', icon: '😠' },
    { name: 'lonely', icon: '🥺' },
    { name: 'stressed', icon: '😩' }
  ];

  const checkAvailability = async () => {
    if (!emotion || !dateTime) return;
    
    setIsLoading(true);
    // Simulate API call with timeout
    setTimeout(() => {
      setAvailableCreators([
        {_id: '1', name: 'Sarah Johnson', avatar: '/api/placeholder/64/64', supportEmotions: ['sad', 'anxious'], rating: 4.9, sessions: 152},
        {_id: '2', name: 'Michael Chen', avatar: '/api/placeholder/64/64', supportEmotions: ['angry', 'stressed'], rating: 4.7, sessions: 89},
        {_id: '3', name: 'Aisha Patel', avatar: '/api/placeholder/64/64', supportEmotions: ['lonely', 'sad'], rating: 4.8, sessions: 210}
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const requestMeeting = async (creatorId) => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Generate a random Google Meet link
      const meetCode = Math.random().toString(36).substring(2, 8);
      const googleMeetLink = `https://meet.google.com/${meetCode}`;
      
      setMeetingStatus({
        success: true,
        message: "Meeting created successfully!",
        creator: availableCreators.find(c => c._id === creatorId)?.name || "Supporter",
        meetLink: googleMeetLink
      });
      
      setIsLoading(false);
    }, 1500);
  };

  // Sample data for preview
  useEffect(() => {
    if (availableCreators.length === 0 && process.env.NODE_ENV === 'development') {
      setAvailableCreators([
        {_id: '1', name: 'Sarah Johnson', avatar: '/api/placeholder/64/64', supportEmotions: ['sad', 'anxious'], rating: 4.9, sessions: 152},
        {_id: '2', name: 'Michael Chen', avatar: '/api/placeholder/64/64', supportEmotions: ['angry', 'stressed'], rating: 4.7, sessions: 89},
        {_id: '3', name: 'Aisha Patel', avatar: '/api/placeholder/64/64', supportEmotions: ['lonely', 'sad'], rating: 4.8, sessions: 210}
      ]);
    }
  }, []);

  return (
    <div className="support-container">
      <div className="support-card">
        <header className="support-header">
          <h1>
            <Heart className="icon" />
            Find Emotional Support
          </h1>
          <p>Connect with compassionate listeners when you need someone to talk to</p>
        </header>
        
        <div className="support-content">
          <section className="emotion-section">
            <h2>
              <span className="section-number">1.</span> How are you feeling today?
            </h2>
            <div className="emotion-grid">
              {emotionOptions.map(opt => (
                <button
                  key={opt.name}
                  className={`emotion-button ${emotion === opt.name ? 'selected' : ''} ${opt.name}`}
                  onClick={() => setEmotion(opt.name)}
                >
                  <span className="emotion-icon">{opt.icon}</span>
                  <span className="emotion-name">{opt.name}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="datetime-section">
            <h2>
              <span className="section-number">2.</span> When do you need support?
            </h2>
            <div className="datetime-container">
              <div className="input-wrapper">
                <Calendar className="input-icon" size={20} />
                <input
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                />
              </div>
              <button 
                onClick={checkAvailability} 
                disabled={!emotion || !dateTime}
                className={`find-button ${(!emotion || !dateTime) ? 'disabled' : ''}`}
              >
                <Users className="button-icon" size={20} />
                Find Supporters
              </button>
            </div>
          </section>

          {isLoading && (
            <div className="loading-container">
              <Loader className="loading-icon" size={24} />
              <span>Finding available supporters...</span>
            </div>
          )}

          {availableCreators.length > 0 && !isLoading && !meetingStatus && (
            <section className="creators-section">
              <h2>
                <span className="section-number">3.</span> Choose a supporter
              </h2>
              <div className="creators-grid">
                {availableCreators.map(creator => (
                  <div key={creator._id} className="creator-card">
                    <div className="creator-header">
                      <div className="creator-avatar">
                        <img src={creator.avatar || "/api/placeholder/64/64"} alt={creator.name} />
                      </div>
                      <div className="creator-info">
                        <h3>{creator.name}</h3>
                        <div className="creator-rating">
                          {'★'.repeat(Math.floor(creator.rating || 4.5))}
                          <span className="sessions-count">({creator.sessions || 0} sessions)</span>
                        </div>
                      </div>
                    </div>
                    <p className="creator-specialties">
                      <span className="specialty-label">Specializes in: </span>
                      {creator.supportEmotions.map(emotion => (
                        <span key={emotion} className="specialty-tag">
                          {emotion}
                        </span>
                      ))}
                    </p>
                    <button 
                      onClick={() => requestMeeting(creator._id)}
                      className="request-button"
                    >
                      <Video size={18} className="button-icon" />
                      Request Meeting
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {meetingStatus && (
            <div className="meeting-success">
              <h3>
                {meetingStatus.message || "Meeting requested successfully"}
              </h3>
              <p>
                You're connected with {meetingStatus.creator}. Click the button below to join the meeting.
              </p>
              <a 
                href={meetingStatus.meetLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="join-button"
              >
                <Video className="button-icon" size={20} />
                Join Google Meet and Get Your Support
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserVideoMeet;