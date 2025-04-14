import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const fetchVideos = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found. Please log in.');

      const response = await axios.get("http://localhost:3000/api/videos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", response.data);
      setVideos(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-blue-400 font-mono text-lg tracking-widest">INITIALIZING...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-gray-900 border border-red-500 p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold">!</span>
          </div>
          <h2 className="text-red-500 font-mono text-lg">SYSTEM ERROR</h2>
        </div>
        <div className="bg-black p-4 rounded font-mono text-red-400 border border-red-800">
          {error}
        </div>
        <button onClick={() => window.location.reload()} className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md w-full font-mono transition-all duration-300">
          RETRY CONNECTION
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 border-b border-blue-600 pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">CREATOR VAULT</h1>
            <p className="text-blue-400 font-mono text-sm mt-1">ACCESS LEVEL: AUTHORIZED • {videos.length} ENTRIES FOUND</p>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-green-400 font-mono text-sm">ONLINE</span>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos
            .filter((video) => video.uploader)
            .map((video) => (
              <div 
                key={video._id} 
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-lg transform transition-all duration-300 hover:scale-102 hover:shadow-blue-500/20 hover:border-blue-500/50"
              >
                <div className="relative">
                  <video 
                    className="w-full h-48 object-cover filter contrast-125" 
                    controls
                    onMouseOver={(e) => e.target.play()} 
                    onMouseOut={(e) => e.target.pause()}
                  >
                    <source src={`http://localhost:3000${video.filePath}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded-full text-xs font-mono text-blue-400">
                    ID: {video._id.slice(-6)}
                  </div>
                </div>
                
                <div className="p-4 border-t border-gray-700">
                  <h2 className="text-lg font-bold text-blue-300 mb-2 truncate">{video.title}</h2>
                  
                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">CREATOR:</span>
                      <span className="text-gray-200">{video.uploader?.name || 'N/A'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">CONTACT:</span>
                      <span className="text-gray-200 truncate max-w-[150px]">{video.uploader?.email || 'N/A'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">UPLOADED:</span>
                      <span className="text-gray-200">{new Date(video.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <button 
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded font-mono text-sm transition-colors duration-300 flex items-center justify-center"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <span className="mr-2">•</span>
                    ACCESS FILE
                  </button>
                </div>
              </div>
            ))}
        </div>
        
        {/* Empty State */}
        {videos.filter(video => video.uploader).length === 0 && (
          <div className="text-center py-16 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h18M3 16h18" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-400">No Videos Found</h3>
            <p className="text-gray-500 mt-2 font-mono">DATABASE RETURNED ZERO ENTRIES</p>
          </div>
        )}
      </div>
      
      {/* Modal for selected video */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-gray-900 border border-blue-500 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-blue-500/20">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h3 className="text-xl font-bold text-blue-400">{selectedVideo.title}</h3>
              <button 
                onClick={() => setSelectedVideo(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <video className="w-full rounded-lg" controls autoPlay>
                <source src={`http://localhost:3000${selectedVideo.filePath}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="mt-4 grid grid-cols-2 gap-4 font-mono text-sm">
                <div className="bg-gray-800 p-3 rounded">
                  <span className="text-gray-400">CREATOR</span>
                  <p className="text-white">{selectedVideo.uploader?.name || 'N/A'}</p>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <span className="text-gray-400">CONTACT</span>
                  <p className="text-white">{selectedVideo.uploader?.email || 'N/A'}</p>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <span className="text-gray-400">UPLOADED</span>
                  <p className="text-white">{new Date(selectedVideo.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <span className="text-gray-400">FILE ID</span>
                  <p className="text-white">{selectedVideo._id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;