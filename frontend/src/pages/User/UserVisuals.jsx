import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sparkles, Music, PenLine, Camera, BookText } from "lucide-react";

const visualsMap = {
  "Handwritten Letters": {
    icon: <PenLine className="w-10 h-10 text-pink-500" />,
    color: "bg-pink-100",
    buttonColor: "bg-pink-500 hover:bg-pink-600",
    actionLabel: "See Letters",
  },
  "Live Concerts": {
    icon: <Music className="w-10 h-10 text-indigo-500" />,
    color: "bg-indigo-100",
    buttonColor: "bg-indigo-500 hover:bg-indigo-600",
    actionLabel: "Watch Concerts",
  },
  Poems: {
    icon: <BookText className="w-10 h-10 text-yellow-500" />,
    color: "bg-yellow-100",
    buttonColor: "bg-yellow-500 hover:bg-yellow-600 text-black",
    actionLabel: "Read Poems",
  },
  "Photo Shoots": {
    icon: <Camera className="w-10 h-10 text-green-500" />,
    color: "bg-green-100",
    buttonColor: "bg-green-500 hover:bg-green-600",
    actionLabel: "View Photos",
  },
  "Creative Spark": {
    icon: <Sparkles className="w-10 h-10 text-purple-500" />,
    color: "bg-purple-100",
    buttonColor: "bg-purple-500 hover:bg-purple-600",
    actionLabel: "Ignite Spark",
  },
};

export default function VisualsPage() {
  const [groupedVisuals, setGroupedVisuals] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users/visulas") // Update with your server port
      .then((res) => {
        const data = res.data;
        const grouped = {};

        data.forEach((creator) => {
          creator.visualPosts.forEach((post) => {
            if (!grouped[post.type]) grouped[post.type] = [];
            grouped[post.type].push({ ...post, creatorName: creator.name });
          });
        });

        setGroupedVisuals(grouped);
      })
      .catch((err) => {
        console.error("Failed to fetch visuals:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-100 p-10">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">
        🎨 Funky Visuals
      </h1>
      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(visualsMap).map(([type, config]) => (
          <div
            key={type}
            className={`rounded-2xl shadow-lg p-6 transform hover:scale-105 transition duration-300 hover:rotate-1 ${config.color}`}
          >
            <div className="flex items-center justify-center mb-4">
              {config.icon}
            </div>
            <h2 className="text-xl font-semibold text-center mb-2 text-gray-800">
              {type}
            </h2>
            <p className="text-center text-sm text-gray-600 mb-4">
              {groupedVisuals[type]?.length || 0} posts found
            </p>
            <ul className="text-sm text-gray-700 mb-4 max-h-32 overflow-y-auto">
              {groupedVisuals[type]?.map((post, i) => (
                <li key={i} className="mb-1">
                  <strong>{post.creatorName}:</strong> {post.content}
                </li>
              ))}
            </ul>
            <div className="flex justify-center">
              <button
                className={`px-5 py-2 rounded-full font-semibold text-white transition-transform duration-300 hover:scale-110 ${config.buttonColor}`}
              >
                {config.actionLabel}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
