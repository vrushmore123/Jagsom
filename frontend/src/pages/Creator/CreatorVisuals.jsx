import React, { useState, useEffect } from "react";
import axios from "axios";

const CreatorVisuals = () => {
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [message, setMessage] = useState("");

  const [creatorId, setCreatorId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedCreatorId = localStorage.getItem("creatorId");

    if (storedToken && storedCreatorId) {
      setToken(storedToken);
      setCreatorId(storedCreatorId);
    } else {
      setMessage("You need to log in first!");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!type || !content) {
      setMessage("Type and content are required");
      return;
    }

    if (!creatorId || !token) {
      setMessage("You need to be logged in to post visuals");
      return;
    }

    try {
      const res = await axios.post(
        `https://jagsom-2.onrender.com/api/creators/${creatorId}/visuals`,
        { type, content, mediaUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Posted successfully!");
      setType("");
      setContent("");
      setMediaUrl("");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error posting content");
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-6 bg-gradient-to-br from-pink-50 via-yellow-50 to-green-50 pt-40"> {/* Added pt-16 for navbar spacing */}
      <div className="max-w-xl mx-auto p-6 rounded-xl shadow-lg bg-white"> {/* Removed gradient from form container */}
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
          Post a Visual
        </h2>

        {message && (
          <div className={`mb-4 text-center text-sm font-semibold ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
            required
          >
            <option value="">Select Type</option>
            <option value="Poems">Poems</option>
            <option value="Handwritten Letters">Handwritten Letters</option>
            <option value="Live Concerts">Live Concerts</option>
            <option value="Drawings">Drawings</option>
          </select>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
            placeholder="Write your content here..."
            className="p-3 border border-gray-300 rounded resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
            required
          />

          <input
            type="text"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            placeholder="Optional media URL (image or video)"
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
          />

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition transform hover:-translate-y-0.5 hover:shadow-md"
          >
            Post Visual
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatorVisuals;