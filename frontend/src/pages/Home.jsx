import React from "react";
import { motion } from "framer-motion";
import { Film, PenTool, Users } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Visuals",
    description:
      "Explore a gallery of handwritten letters and emotional visuals from the database.",
    icon: <PenTool className="w-8 h-8 text-blue-500" />,
    action: "Explore Visuals",
    path: "/visuals",
  },
  {
    title: "Cultural",
    description:
      "Dive into diverse cultural perspectives through curated emotional content.",
    icon: <Film className="w-8 h-8 text-green-500" />,
    action: "View Culture",
    path: "/cultural",
  },
  {
    title: "Meeting",
    description:
      "Engage with emotional stories via video sessions and live interactions.",
    icon: <Users className="w-8 h-8 text-purple-500" />,
    action: "Join Meetings",
    path: "/meeting",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <motion.h1
        className="text-4xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Emotion Builder
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
          >
            <div className="rounded-2xl shadow-md p-6 bg-white text-center flex flex-col items-center gap-4">
              {feature.icon}
              <h2 className="text-xl font-semibold">{feature.title}</h2>
              <p className="text-sm text-gray-600">{feature.description}</p>
              <Link to={feature.path}>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  {feature.action}
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
