import { useState, useEffect } from 'react';
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
      case 'online': return 'bg-emerald-500';
      case 'offline': return 'bg-gray-500';
      case 'in-meeting': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getEmotionColor = (emotion) => {
    switch(emotion) {
      case 'sad': return 'bg-blue-100 text-blue-800';
      case 'anxious': return 'bg-amber-100 text-amber-800';
      case 'angry': return 'bg-red-100 text-red-800';
      case 'lonely': return 'bg-purple-100 text-purple-800';
      case 'stressed': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMeetingStatusClass = (status) => {
    switch(status) {
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'accepted': return 'bg-emerald-100 text-emerald-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-amber-100 text-amber-800';
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header with status */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-6 gap-4">
            <div className="flex items-center">
              <Video className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Video Support Dashboard</h1>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center">
                <div className={`h-3 w-3 rounded-full mr-2 ${getStatusColor(currentStatus)}`}></div>
                <span className="text-sm font-medium text-gray-700 capitalize">{currentStatus}</span>
              </div>
              
              <div className="flex bg-gray-100 rounded-lg p-1">
                {['online', 'offline', 'in-meeting'].map(status => (
                  <button
                    key={status}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      currentStatus === status 
                        ? 'bg-white text-indigo-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    onClick={() => handleStatusChange(status)}
                  >
                    {status === 'online' ? 'Online' : status === 'offline' ? 'Offline' : 'In Meeting'}
                  </button>
                ))}
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={availableForSupport}
                  onChange={(e) => setAvailableForSupport(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-700">Available for Support</span>
              </label>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('meetings')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'meetings' 
                    ? 'border-indigo-500 text-indigo-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Upcoming Meetings
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'settings' 
                    ? 'border-indigo-500 text-indigo-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Availability Settings
              </button>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'meetings' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Upcoming Support Sessions</h2>
            
            {upcomingMeetings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingMeetings.map(meeting => (
                  <div key={meeting._id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                          <img src={meeting.user.avatar} alt="User" className="h-full w-full" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-base font-medium text-gray-900">{meeting.user.name}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEmotionColor(meeting.emotion)}`}>
                            {meeting.emotion.charAt(0).toUpperCase() + meeting.emotion.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" />
                          {new Date(meeting.dateTime).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" />
                          {new Date(meeting.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMeetingStatusClass(meeting.status)}`}>
                            {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                      {meeting.status === 'pending' && (
                        <div className="flex space-x-3">
                          <button 
                            onClick={() => handleMeetingAction(meeting._id, 'accepted')}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors shadow-sm"
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => handleMeetingAction(meeting._id, 'rejected')}
                            className="flex-1 bg-white hover:bg-gray-50 text-gray-700 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium transition-colors shadow-sm"
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
                          className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors shadow-sm"
                        >
                          <Video className="mr-2 h-4 w-4" />
                          Join Google Meet
                        </a>
                      )}
                      
                      {meeting.status === 'rejected' && (
                        <p className="text-center text-sm text-gray-500">This meeting was declined</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden text-center p-12">
                <Video className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming meetings</h3>
                <p className="mt-1 text-sm text-gray-500">You don't have any scheduled support sessions yet.</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Supported Emotions */}
            {availableForSupport && (
              <div className="bg-white shadow overflow-hidden rounded-lg">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Supported Emotions
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Select the emotions you're able to provide support for
                  </p>
                </div>
                <div className="px-6 py-5">
                  <div className="flex flex-wrap gap-2">
                    {emotionOptions.map(emotion => (
                      <button
                        key={emotion}
                        onClick={() => handleEmotionToggle(emotion)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                          supportEmotions.includes(emotion) 
                            ? `${getEmotionColor(emotion)} ring-2 ring-offset-2 ring-white` 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
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
              <div className="bg-white shadow overflow-hidden rounded-lg">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Weekly Availability
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Set your recurring availability for support sessions
                  </p>
                </div>
                
                <div className="px-6 py-5">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <select
                        value={newAvailability.day}
                        onChange={(e) => setNewAvailability({...newAvailability, day: e.target.value})}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      
                      <input
                        type="time"
                        value={newAvailability.endTime}
                        onChange={(e) => setNewAvailability({...newAvailability, endTime: e.target.value})}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <button 
                      onClick={handleAddAvailability}
                      className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors shadow-sm"
                    >
                      Add Availability Slot
                    </button>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-base font-medium text-gray-900">Your Current Availability:</h4>
                    {availability.length > 0 ? (
                      <div className="mt-4 space-y-2">
                        {availability.map((slot, index) => (
                          <div key={index} className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-md">
                            <div className="flex items-center">
                              <span className="font-medium capitalize">{slot.day}</span>
                              <span className="ml-2 text-gray-600">
                                {slot.startTime} - {slot.endTime}
                              </span>
                            </div>
                            <button 
                              onClick={() => handleRemoveAvailability(index)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2 text-sm italic text-gray-500">No availability slots added yet</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Save Button */}
            <div className="flex justify-end">
              <button 
                onClick={handleSaveSettings}
                disabled={isLoading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-md text-sm font-medium transition-colors shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : 'Save All Settings'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorVideoMeetPage;