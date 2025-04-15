import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Video, X, CheckCircle, XCircle, Settings, User } from 'lucide-react';

const CreatorVideoMeetPage = () => {
  const [availableForSupport, setAvailableForSupport] = useState(false);
  const [supportEmotions, setSupportEmotions] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [newAvailability, setNewAvailability] = useState({
    day: 'monday',
    startTime: '',
    endTime: ''
  });
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [currentStatus, setCurrentStatus] = useState('offline');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('meetings');

  const emotionOptions = ['sad', 'anxious', 'angry', 'lonely', 'stressed'];
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  // Generate a random Google Meet link
  const generateGoogleMeetLink = () => {
    const meetCode = Math.random().toString(36).substring(2, 8);
    return `https://meet.google.com/${meetCode}`;
  };

  // Mock data for visual design
  useEffect(() => {
    if (upcomingMeetings.length === 0) {
      setUpcomingMeetings([
        {
          _id: '1',
          emotion: 'anxious',
          dateTime: new Date().setHours(new Date().getHours() + 2),
          status: 'pending',
          user: {
            name: 'Alex Johnson',
            avatar: '/api/placeholder/40/40'
          }
        },
        {
          _id: '2',
          emotion: 'sad',
          dateTime: new Date().setDate(new Date().getDate() + 1),
          status: 'accepted',
          meetLink: 'https://meet.google.com/abc-defg-hij',
          user: {
            name: 'Taylor Smith',
            avatar: '/api/placeholder/40/40'
          }
        }
      ]);
      
      setSupportEmotions(['sad', 'anxious', 'stressed']);
      
      setAvailability([
        { day: 'monday', startTime: '09:00', endTime: '12:00' },
        { day: 'wednesday', startTime: '14:00', endTime: '18:00' },
        { day: 'friday', startTime: '10:00', endTime: '15:00' }
      ]);
    }
  }, [upcomingMeetings.length]);

  useEffect(() => {
    // Fetch creator's existing settings and meetings
    const fetchCreatorData = async () => {
      try {
        const response = await fetch('/api/creators/profile');
        if (response.ok) {
          const data = await response.json();
          setAvailableForSupport(data.availableForSupport);
          setSupportEmotions(data.supportEmotions);
          setAvailability(data.availability);
          setUpcomingMeetings(data.upcomingMeetings);
          setCurrentStatus(data.currentStatus);
        }
      } catch (error) {
        console.error('Error fetching creator data:', error);
      }
    };
    // Comment out to use mock data instead
    // fetchCreatorData();
  }, []);

  const handleEmotionToggle = (emotion) => {
    setSupportEmotions(prev =>
      prev.includes(emotion)
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleAddAvailability = () => {
    if (newAvailability.startTime && newAvailability.endTime) {
      setAvailability([...availability, newAvailability]);
      setNewAvailability({
        day: 'monday',
        startTime: '',
        endTime: ''
      });
    }
  };

  const handleRemoveAvailability = (index) => {
    setAvailability(availability.filter((_, i) => i !== index));
  };

  const handleStatusChange = (status) => {
    setCurrentStatus(status);
  };
  
  const handleSaveSettings = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const handleMeetingAction = async (meetingId, action) => {
    const updatedMeetings = upcomingMeetings.map(m => {
      if (m._id === meetingId) {
        const updatedMeeting = { ...m, status: action };
        
        // Generate a Google Meet link for accepted meetings
        if (action === 'accepted' && !updatedMeeting.meetLink) {
          updatedMeeting.meetLink = generateGoogleMeetLink();
        }
        
        return updatedMeeting;
      }
      return m;
    });
    
    setUpcomingMeetings(updatedMeetings);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return 'status-online';
      case 'offline': return 'status-offline';
      case 'in-meeting': return 'status-in-meeting';
      default: return 'status-offline';
    }
  };
  
  const getEmotionColor = (emotion) => {
    switch(emotion) {
      case 'sad': return 'emotion-sad';
      case 'anxious': return 'emotion-anxious';
      case 'angry': return 'emotion-angry';
      case 'lonely': return 'emotion-lonely';
      case 'stressed': return 'emotion-stressed';
      default: return 'emotion-default';
    }
  };

  const getMeetingStatusClass = (status) => {
    switch(status) {
      case 'pending': return 'meeting-pending';
      case 'accepted': return 'meeting-accepted';
      case 'rejected': return 'meeting-rejected';
      default: return 'meeting-pending';
    }
  };

  return (
    <div className="page-container">
      {/* Header with status */}
      <div className="header">
        <div className="header-content">
          <div className="header-main">
            <div className="header-logo">
              <Video className="logo-icon" />
              <h1 className="header-title">Video Support Dashboard</h1>
            </div>
            
            <div className="header-controls">
              <div className="status-indicator">
                <div className={`status-dot ${getStatusColor(currentStatus)}`}></div>
                <span className="status-text">{currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}</span>
              </div>
              
              <div className="status-toggle">
                {['online', 'offline', 'in-meeting'].map(status => (
                  <button
                    key={status}
                    className={`status-button ${currentStatus === status ? 'status-button-active' : ''}`}
                    onClick={() => handleStatusChange(status)}
                  >
                    {status === 'online' ? 'Online' : status === 'offline' ? 'Offline' : 'In Meeting'}
                  </button>
                ))}
              </div>
              
              <label className="availability-toggle">
                <input
                  type="checkbox"
                  checked={availableForSupport}
                  onChange={(e) => setAvailableForSupport(e.target.checked)}
                  className="toggle-input"
                />
                <div className="toggle-slider"></div>
                <span className="toggle-label">Available for Support</span>
              </label>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="navigation-tabs">
            <nav className="tabs-container">
              <button
                onClick={() => setActiveTab('meetings')}
                className={`tab-button ${activeTab === 'meetings' ? 'tab-active' : ''}`}
              >
                Upcoming Meetings
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`tab-button ${activeTab === 'settings' ? 'tab-active' : ''}`}
              >
                Availability Settings
              </button>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        {activeTab === 'meetings' && (
          <div className="meetings-container">
            <h2 className="section-title">Upcoming Support Sessions</h2>
            
            {upcomingMeetings.length > 0 ? (
              <div className="meetings-grid">
                {upcomingMeetings.map(meeting => (
                  <div key={meeting._id} className="meeting-card">
                    <div className="meeting-info">
                      <div className="user-info">
                        <img src={meeting.user.avatar} alt="User" className="user-avatar" />
                        <div className="user-details">
                          <h3 className="user-name">{meeting.user.name}</h3>
                          <span className={`emotion-badge ${getEmotionColor(meeting.emotion)}`}>
                            {meeting.emotion}
                          </span>
                        </div>
                      </div>
                      
                      <div className="meeting-details">
                        <div className="meeting-date">
                          <Calendar className="detail-icon" />
                          {new Date(meeting.dateTime).toLocaleDateString()}
                        </div>
                        <div className="meeting-time">
                          <Clock className="detail-icon" />
                          {new Date(meeting.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="meeting-status">
                          <span className={`status-badge ${getMeetingStatusClass(meeting.status)}`}>
                            {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="meeting-actions">
                      {meeting.status === 'pending' && (
                        <div className="action-buttons">
                          <button 
                            onClick={() => handleMeetingAction(meeting._id, 'accepted')}
                            className="accept-button"
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => handleMeetingAction(meeting._id, 'rejected')}
                            className="decline-button"
                          >
                            Decline
                          </button>
                        </div>
                      )}
                      
                      {meeting.status === 'accepted' && (
                        <a 
                          href={meeting.meetLink || generateGoogleMeetLink()}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="join-button"
                        >
                          <Video className="join-icon" />
                          Join Google Meet
                        </a>
                      )}
                      
                      {meeting.status === 'rejected' && (
                        <p className="declined-text">This meeting was declined</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-meetings">
                <Video className="no-meetings-icon" />
                <h3 className="no-meetings-title">No upcoming meetings</h3>
                <p className="no-meetings-text">You don't have any scheduled support sessions yet.</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="settings-container">
            {/* Supported Emotions */}
            {availableForSupport && (
              <div className="settings-card">
                <div className="card-header">
                  <h3 className="card-title">
                    Supported Emotions
                  </h3>
                  <p className="card-description">
                    Select the emotions you're able to provide support for
                  </p>
                </div>
                <div className="card-content">
                  <div className="emotions-grid">
                    {emotionOptions.map(emotion => (
                      <button
                        key={emotion}
                        onClick={() => handleEmotionToggle(emotion)}
                        className={`emotion-button ${supportEmotions.includes(emotion) ? `${getEmotionColor(emotion)} selected` : ''}`}
                      >
                        {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Availability Slots */}
            {availableForSupport && (
              <div className="settings-card">
                <div className="card-header">
                  <h3 className="card-title">
                    Weekly Availability
                  </h3>
                  <p className="card-description">
                    Set your recurring availability for support sessions
                  </p>
                </div>
                
                <div className="card-content">
                  <div className="availability-form">
                    <div className="availability-inputs">
                      <select
                        value={newAvailability.day}
                        onChange={(e) => setNewAvailability({...newAvailability, day: e.target.value})}
                        className="day-select"
                      >
                        {daysOfWeek.map(day => (
                          <option key={day} value={day}>
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                          </option>
                        ))}
                      </select>
                      
                      <input
                        type="time"
                        value={newAvailability.startTime}
                        onChange={(e) => setNewAvailability({...newAvailability, startTime: e.target.value})}
                        className="time-input"
                      />
                      
                      <input
                        type="time"
                        value={newAvailability.endTime}
                        onChange={(e) => setNewAvailability({...newAvailability, endTime: e.target.value})}
                        className="time-input"
                      />
                    </div>
                    
                    <div className="add-availability">
                      <button 
                        onClick={handleAddAvailability}
                        className="add-button"
                      >
                        Add Availability Slot
                      </button>
                    </div>
                  </div>

                  <div className="availability-list">
                    <h4 className="list-title">Your Current Availability:</h4>
                    {availability.length > 0 ? (
                      <div className="availability-slots">
                        {availability.map((slot, index) => (
                          <div key={index} className="availability-slot">
                            <div className="slot-info">
                              <span className="slot-day">{slot.day}</span>
                              <span className="slot-time">
                                {slot.startTime} - {slot.endTime}
                              </span>
                            </div>
                            <button 
                              onClick={() => handleRemoveAvailability(index)}
                              className="remove-button"
                            >
                              <X className="remove-icon" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="no-slots">No availability slots added yet</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Save Button */}
            <div className="save-container">
              <button 
                onClick={handleSaveSettings}
                disabled={isLoading}
                className="save-button"
              >
                {isLoading ? 'Saving...' : 'Save All Settings'}
              </button>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        /* Global Styles */
        .page-container {
          min-height: 100vh;
          background-color: #f9fafb;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        
        /* Header Styles */
        .header {
          background-color: #fff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .header-content {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .header-main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 0;
        }
        
        .header-logo {
          display: flex;
          align-items: center;
        }
        
        .logo-icon {
          height: 32px;
          width: 32px;
          color: #4f46e5;
        }
        
        .header-title {
          margin-left: 12px;
          font-size: 24px;
          font-weight: 700;
          color: #111827;
        }
        
        .header-controls {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        /* Status Indicator */
        .status-indicator {
          display: flex;
          align-items: center;
        }
        
        .status-dot {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          margin-right: 8px;
        }
        
        .status-online {
          background-color: #10b981;
        }
        
        .status-offline {
          background-color: #6b7280;
        }
        
        .status-in-meeting {
          background-color: #f59e0b;
        }
        
        .status-text {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          text-transform: capitalize;
        }
        
        /* Status Toggle */
        .status-toggle {
          background-color: #f3f4f6;
          border-radius: 8px;
          padding: 4px;
          display: flex;
        }
        
        .status-button {
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 14px;
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
        }
        
        .status-button-active {
          background-color: #fff;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          color: #4f46e5;
        }
        
        /* Availability Toggle */
        .availability-toggle {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        
        .toggle-input {
          position: absolute;
          opacity: 0;
          height: 0;
          width: 0;
        }
        
        .toggle-slider {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
          background-color: #e5e7eb;
          border-radius: 24px;
          transition: 0.4s;
        }
        
        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 2px;
          bottom: 2px;
          background-color: white;
          border-radius: 50%;
          transition: 0.4s;
        }
        
        .toggle-input:checked + .toggle-slider {
          background-color: #4f46e5;
        }
        
        .toggle-input:checked + .toggle-slider:before {
          transform: translateX(20px);
        }
        
        .toggle-label {
          margin-left: 12px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }
        
        /* Navigation Tabs */
        .navigation-tabs {
          border-bottom: 1px solid #e5e7eb;
        }
        
        .tabs-container {
          display: flex;
          gap: 32px;
        }
        
        .tab-button {
          padding: 16px 4px;
          font-size: 14px;
          font-weight: 500;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          color: #6b7280;
        }
        
        .tab-button:hover {
          color: #374151;
          border-color: #d1d5db;
        }
        
        .tab-active {
          color: #4f46e5;
          border-color: #4f46e5;
        }
        
        /* Main Content */
        .main-content {
          max-width: 1280px;
          margin: 0 auto;
          padding: 32px 20px;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 500;
          color: #111827;
          margin-bottom: 24px;
        }
        
        /* Meetings Grid */
        .meetings-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        
        @media (min-width: 768px) {
          .meetings-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .meetings-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        /* Meeting Card */
        .meeting-card {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        .meeting-info {
          padding: 24px;
        }
        
        .user-info {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #f3f4f6;
        }
        
        .user-details {
          margin-left: 12px;
        }
        
        .user-name {
          font-size: 14px;
          font-weight: 500;
          color: #111827;
        }
        
        .emotion-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 8px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .emotion-sad {
          background-color: #dbeafe;
          color: #1e40af;
        }
        
        .emotion-anxious {
          background-color: #fef3c7;
          color: #92400e;
        }
        
        .emotion-angry {
          background-color: #fee2e2;
          color: #b91c1c;
        }
        
        .emotion-lonely {
          background-color: #f3e8ff;
          color: #6b21a8;
        }
        
        .emotion-stressed {
          background-color: #ffedd5;
          color: #9a3412;
        }
        
        .emotion-default {
          background-color: #f3f4f6;
          color: #374151;
        }
        
        .meeting-details {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .meeting-date, .meeting-time {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #6b7280;
        }
        
        .detail-icon {
          margin-right: 6px;
          height: 20px;
          width: 20px;
          color: #9ca3af;
        }
        
        .status-badge {
          display: inline-flex;
          padding: 4px 8px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .meeting-pending {
          background-color: #fef3c7;
          color: #92400e;
        }
        
        .meeting-accepted {
          background-color: #d1fae5;
          color: #065f46;
        }
        
        .meeting-rejected {
          background-color: #fee2e2;
          color: #b91c1c;
        }
        
        .meeting-actions {
          padding: 16px 24px;
          background-color: #f9fafb;
          border-top: 1px solid #f3f4f6;
        }
        
        .action-buttons {
          display: flex;
          gap: 12px;
        }
        
        .accept-button {
          flex: 1;
          padding: 8px 16px;
          background-color: #4f46e5;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .accept-button:hover {
          background-color: #4338ca;
        }
        
        .decline-button {
          flex: 1;
          padding: 8px 16px;
          background-color: white;
          color: #374151;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .decline-button:hover {
          background-color: #f9fafb;
        }
        
        .join-button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 8px 16px;
          background-color: #10b981;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .join-button:hover {
          background-color: #059669;
        }
        
        .join-icon {
          margin-right: 8px;
          height: 20px;
          width: 20px;
        }
        
        .declined-text {
          text-align: center;
          font-size: 14px;
          color: #6b7280;
        }
        
        /* No Meetings */
        .no-meetings {
          text-align: center;
          padding: 48px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .no-meetings-icon {
          height: 48px;
          width: 48px;
          color: #9ca3af;
          margin: 0 auto;
        }
        
        .no-meetings-title {
          margin-top: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #111827;
        }
        
        .no-meetings-text {
          margin-top: 4px;
          font-size: 14px;
          color: #6b7280;
        }
        
        /* Settings Container */
        .settings-container {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        
        /* Settings Card */
        .settings-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        .card-header {
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .card-title {
          font-size: 18px;
          font-weight: 500;
          color: #111827;
        }
        
        .card-description {
          margin-top: 4px;
          font-size: 14px;
          color: #6b7280;
        }
        
        .card-content {
          padding: 20px 24px;
        }
        
        /* Emotions Grid */
        .emotions-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .emotion-button {
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 500;
          background-color: #f3f4f6;
          color: #374151;
          border: none;
          cursor: pointer;
        }
        
        .emotion-button:hover {
          background-color: #e5e7eb;
        }
        
        .emotion-button.selected {
          box-shadow: 0 0 0 2px white, 0 0 0 4px;
        }
        
        /* Availability Form */
        .availability-form {
          margin-bottom: 24px;
        }
        
        .availability-inputs {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        
        @media (min-width: 768px) {
          .availability-inputs {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .day-select,
        .time-input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .day-select:focus,
        .time-input:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.3);
        }
        
        .add-availability {
          margin-top: 16px;
        }
        
        .add-button {
          width: 100%;
          padding: 8px 16px;
          background-color: #4f46e5;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .add-button:hover {
          background-color: #4338ca;
        }
        
        /* Availability List */
        .availability-list {
          padding-top: 24px;
          border-top: 1px solid #e5e7eb;
        }
        
        .list-title {
          font-size: 16px;
          font-weight: 500;
          color: #111827;
          margin-bottom: 16px;
        }
        
        .availability-slots {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .availability-slot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background-color: #f9fafb;
          border-radius: 6px;
        }
        
        .slot-info {
          display: flex;
          align-items: center;
        }
        
        .slot-day {
          font-weight: 500;
          text-transform: capitalize;
          color: #111827;
        }
        
        .slot-time {
          margin-left: 8px;
          color: #6b7280;
        }
        
        .remove-button {
          background: none;
          border: none;
          cursor: pointer;
          color: #9ca3af;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .remove-button:hover {
          color: #6b7280;
        }
        
        .remove-icon {
          height: 20px;
          width: 20px;
        }
        
        .no-slots {
          font-style: italic;
          color: #6b7280;
        }
        
        /* Save Container */
        .save-container {
          display: flex;
          justify-content: flex-end;
        }
        
        .save-button {
          padding: 8px 16px;
          background-color: #4f46e5;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .save-button:hover {
          background-color: #4338ca;
        }
        
        .save-button:disabled {
          background-color: #6b7280;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default CreatorVideoMeetPage;