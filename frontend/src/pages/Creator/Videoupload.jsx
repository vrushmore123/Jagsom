import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileSize, setFileSize] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    // Clean up preview URL when component unmounts
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateForm = () => {
    const errors = {};
    if (!title.trim()) errors.title = "Title is required";
    if (!name.trim()) errors.name = "Culture name is required";
    if (!description.trim()) errors.description = "Description is required";
    if (!selectedFile) errors.file = "Please select a video file";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      
      setSelectedFile(file);
      setFileSize(formatFileSize(file.size));
      
      // Create a preview URL for the video
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Clear file error if exists
      if (formErrors.file) {
        setFormErrors({...formErrors, file: null});
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      if (file.type.startsWith('video/')) {
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
        
        setSelectedFile(file);
        setFileSize(formatFileSize(file.size));
        
        // Create a preview URL for the video
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        
        // Clear file error if exists
        if (formErrors.file) {
          setFormErrors({...formErrors, file: null});
        }
      } else {
        setFormErrors({...formErrors, file: "Please select a video file"});
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadSuccess(false);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", title);
    formData.append("name", name);
    formData.append("description", description);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/videos/upload",
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      console.log("Upload success:", response.data);
      setIsUploading(false);
      setUploadSuccess(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setTitle('');
        setName('');
        setDescription('');
        setSelectedFile(null);
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
        setFileSize(null);
        setUploadProgress(0);
        setUploadSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error("Upload failed:", error);
      setIsUploading(false);
      alert("Upload failed: " + (error.response?.data?.message || error.message));
    }
  };

  const resetForm = () => {
    setTitle('');
    setName('');
    setDescription('');
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setFileSize(null);
    setFormErrors({});
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl w-full max-w-lg p-8 border border-gray-100 relative backdrop-blur-sm bg-white/80"
      >
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center mb-6"
        >
          <div className="bg-red-50 p-3 rounded-lg mr-4">
            <motion.svg 
              whileHover={{ rotate: 10 }}
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-red-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </motion.svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 leading-tight">Upload Your Video</h2>
            <p className="text-gray-500">Share your creativity with the world</p>
          </div>
        </motion.div>
        
        <AnimatePresence>
          {uploadSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 bg-green-50 text-green-700 p-4 rounded-lg flex items-center"
            >
              <motion.svg 
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </motion.svg>
              <span>Upload successful! Your video is now processing.</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.form 
          variants={formVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleUpload} 
          className="space-y-6"
        >
          <AnimatePresence>
            {previewUrl && (
              <motion.div 
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-gray-100 rounded-lg p-3 shadow-inner"
              >
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <video 
                    src={previewUrl} 
                    className="w-full h-48 object-cover rounded-lg shadow-sm" 
                    controls
                  />
                </motion.div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500">Preview of selected video</p>
                  {fileSize && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
                    >
                      {fileSize}
                    </motion.span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.div variants={itemVariants} className="space-y-5">
            <div 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`bg-gray-50 p-4 rounded-lg border-2 border-dashed transition-all duration-300 ${
                dragActive 
                  ? 'border-red-400 bg-red-50' 
                  : formErrors.file 
                    ? 'border-red-300' 
                    : 'border-gray-200'
              } hover:shadow-md`}
            >
              <motion.label 
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Choose Video File
              </motion.label>
              <div className="relative">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-600 hover:file:bg-red-100 cursor-pointer focus:outline-none transition-colors duration-300"
                />
                <AnimatePresence>
                  {selectedFile && (
                    <motion.button 
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                      type="button" 
                      onClick={() => {
                        setSelectedFile(null);
                        if (previewUrl) {
                          URL.revokeObjectURL(previewUrl);
                          setPreviewUrl(null);
                        }
                        setFileSize(null);
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex justify-between mt-1">
                <p className="text-xs text-gray-500">Max file size: 100MB</p>
                <AnimatePresence>
                  {formErrors.file && (
                    <motion.p 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="text-xs text-red-500"
                    >
                      {formErrors.file}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: dragActive ? 0.7 : 0 }}
                className="absolute inset-0 bg-red-50 rounded-lg flex items-center justify-center pointer-events-none"
              >
                <div className="text-red-600 font-medium flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Drop your video here
                </div>
              </motion.div>
            </div>
            
            <motion.div variants={itemVariants}>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">Video Title</label>
                <AnimatePresence>
                  {formErrors.title && (
                    <motion.span 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="text-xs text-red-500"
                    >
                      {formErrors.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                type="text"
                placeholder="Enter a catchy title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (formErrors.title) setFormErrors({...formErrors, title: null});
                }}
                className={`w-full px-4 py-3 border ${formErrors.title ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300`}
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">Culture Name</label>
                <AnimatePresence>
                  {formErrors.name && (
                    <motion.span 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="text-xs text-red-500"
                    >
                      {formErrors.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                type="text"
                placeholder="Name the culture"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (formErrors.name) setFormErrors({...formErrors, name: null});
                }}
                className={`w-full px-4 py-3 border ${formErrors.name ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300`}
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <AnimatePresence>
                  {formErrors.description && (
                    <motion.span 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="text-xs text-red-500"
                    >
                      {formErrors.description}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                placeholder="Tell us about your video"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (formErrors.description) setFormErrors({...formErrors, description: null});
                }}
                rows="4"
                className={`w-full px-4 py-3 border ${formErrors.description ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none transition-all duration-300`}
              />
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {isUploading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    className="bg-red-600 h-2.5 rounded-full"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  ></motion.div>
                </div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-gray-500 text-right mt-1"
                >
                  {uploadProgress}% uploaded
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            variants={itemVariants}
            className="flex gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              type="submit"
              disabled={isUploading || uploadSuccess}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                isUploading || uploadSuccess ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg'
              }`}
            >
              {isUploading ? (
                <>
                  <motion.span 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="rounded-full h-5 w-5 border-2 border-white border-t-transparent"
                  ></motion.span>
                  <span>Uploading...</span>
                </>
              ) : uploadSuccess ? (
                <>
                  <motion.svg 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </motion.svg>
                  <span>Uploaded!</span>
                </>
              ) : (
                <>
                  <motion.svg 
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </motion.svg>
                  <span>Upload Video</span>
                </>
              )}
            </motion.button>
            
            <AnimatePresence>
              {!isUploading && !uploadSuccess && (selectedFile || title || name || description) && (
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-300"
                >
                  Reset
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-xs text-center text-gray-500 mt-4"
          >
            By uploading, you agree to our{" "}
            <motion.span 
              whileHover={{ color: "#dc2626" }}
              className="text-red-600 cursor-pointer hover:underline transition-colors duration-300"
            >
              Terms of Service
            </motion.span>{" "}
            and{" "}
            <motion.span 
              whileHover={{ color: "#dc2626" }}
              className="text-red-600 cursor-pointer hover:underline transition-colors duration-300"
            >
              Community Guidelines
            </motion.span>
          </motion.p>
        </motion.form>
      </motion.div>
      
      {/* Add required style for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default VideoUpload;