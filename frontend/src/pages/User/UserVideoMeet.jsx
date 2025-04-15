import { useState, useEffect } from 'react';
import { Calendar, Clock, Loader, Heart, Users, Video } from 'lucide-react';

const UserVideoMeet = () => {
  const [emotion, setEmotion] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [availableCreators, setAvailableCreators] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [meetingStatus, setMeetingStatus] = useState(null);

  const emotionOptions = [
    { name: 'sad', icon: '😢', color: 'bg-blue-50 hover:bg-blue-100 border-blue-200' },
    { name: 'anxious', icon: '😰', color: 'bg-amber-50 hover:bg-amber-100 border-amber-200' },
    { name: 'angry', icon: '😠', color: 'bg-red-50 hover:bg-red-100 border-red-200' },
    { name: 'lonely', icon: '🥺', color: 'bg-purple-50 hover:bg-purple-100 border-purple-200' },
    { name: 'stressed', icon: '😩', color: 'bg-orange-50 hover:bg-orange-100 border-orange-200' }
  ];

  const checkAvailability = async () => {
    if (!emotion || !dateTime) return;
    
    setIsLoading(true);
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
    
    setTimeout(() => {
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
    <div className="min-h-screen pt-16 pb-10 bg-gradient-to-br from-blue-50 to-purple-50 px-4 sm:px-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 py-8 px-6 text-white text-center">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-3">
            <Heart className="h-8 w-8" />
            <span>Find Emotional Support</span>
          </h1>
          <p className="mt-2 text-indigo-100 text-lg">
            Connect with compassionate listeners when you need someone to talk to
          </p>
        </header>
        
        <div className="p-6 sm:p-8">
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
              <span className="flex items-center justify-center h-7 w-7 rounded-full bg-indigo-600 text-white text-sm mr-3">1</span>
              How are you feeling today?
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {emotionOptions.map(opt => (
                <button
                  key={opt.name}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                    opt.color
                  } ${
                    emotion === opt.name ? 'border-indigo-500 scale-105 shadow-md' : 'border-transparent'
                  }`}
                  onClick={() => setEmotion(opt.name)}
                >
                  <span className="text-4xl mb-2">{opt.icon}</span>
                  <span className="text-sm font-medium capitalize">{opt.name}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
              <span className="flex items-center justify-center h-7 w-7 rounded-full bg-indigo-600 text-white text-sm mr-3">2</span>
              When do you need support?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                />
              </div>
              <button 
                onClick={checkAvailability} 
                disabled={!emotion || !dateTime}
                className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all ${
                  !emotion || !dateTime 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg'
                }`}
              >
                <Users className="h-5 w-5 mr-2" />
                Find Supporters
              </button>
            </div>
          </section>

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-10">
              <Loader className="h-8 w-8 text-indigo-600 animate-spin mb-3" />
              <span className="text-gray-600">Finding available supporters...</span>
            </div>
          )}

          {availableCreators.length > 0 && !isLoading && !meetingStatus && (
            <section>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                <span className="flex items-center justify-center h-7 w-7 rounded-full bg-indigo-600 text-white text-sm mr-3">3</span>
                Choose a supporter
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {availableCreators.map(creator => (
                  <div key={creator._id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      <div className="h-16 w-16 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                        <img src={creator.avatar || "/api/placeholder/64/64"} alt={creator.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">{creator.name}</h3>
                        <div className="flex items-center mt-1">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}>{i < Math.floor(creator.rating || 4.5) ? '★' : '☆'}</span>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">({creator.sessions || 0} sessions)</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Specializes in: </span>
                        {creator.supportEmotions.map(emotion => (
                          <span key={emotion} className="inline-block bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full mr-1 mb-1">
                            {emotion}
                          </span>
                        ))}
                      </p>
                      <button 
                        onClick={() => requestMeeting(creator._id)}
                        className="w-full flex items-center justify-center py-2 px-4 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors font-medium"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Request Meeting
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {meetingStatus && (
            <div className="border-2 border-emerald-200 bg-emerald-50 rounded-xl p-6 mt-8 text-center">
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">
                {meetingStatus.message || "Meeting requested successfully"}
              </h3>
              <p className="text-emerald-700 mb-6">
                You're connected with {meetingStatus.creator}. Click the button below to join the meeting.
              </p>
              <a 
                href={meetingStatus.meetLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                <Video className="h-5 w-5 mr-2" />
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