import React, { useState } from "react";
import { UploadCloud, Globe, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreatorDashboard = () => {
  const [hoveredSection, setHoveredSection] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const navigate = useNavigate();

  const sections = [
    {
      id: "emotional-content",
      name: "Upload Emotional Content",
      description:
        "Share impactful visual content—videos, performances, and stories—that help users reconnect with their emotions.",
      icon: UploadCloud,
      color: "bg-gradient-to-br from-indigo-500 to-purple-500",
      hoverColor: "from-indigo-600 to-purple-600",
      route: "/creator/CreatorVisuals",
    },
    {
      id: "cultural-content",
      name: "Preserve Cultural Emotions",
      description:
        "Contribute to the revival of cultural identity by uploading traditions, rituals, festivals, and shared practices.",
      icon: Globe,
      color: "bg-gradient-to-br from-emerald-500 to-teal-500",
      hoverColor: "from-emerald-600 to-teal-600",
      route:"/creator/upload",
    },
    {
      id: "emotional-support",
      name: "Offer Emotional Support",
      description:
        "Be present for those in need—provide support through meaningful conversations and Google Meet sessions.",
      icon: Users,
      color: "bg-gradient-to-br from-pink-500 to-rose-500",
      hoverColor: "from-pink-600 to-rose-600",
      route: "/creator/video-meet",
    },
  ];

  const handleCardClick = (section) => {
    setSelectedSection(section.id);
    if (section.route) {
      navigate(section.route);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <UploadCloud className="text-indigo-500" size={48} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
            Creator Control Panel
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose how you want to contribute to the emotional awakening of our world. Your content and presence matter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((section) => {
            const Icon = section.icon;
            const isHovered = hoveredSection === section.id;
            const isSelected = selectedSection === section.id;

            return (
              <div
                key={section.id}
                className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
                  isHovered ? "transform -translate-y-2 shadow-xl" : ""
                } ${isSelected ? "ring-4 ring-offset-2 ring-blue-400" : ""}`}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                onClick={() => handleCardClick(section)}
              >
                <div
                  className={`${
                    section.color
                  } transition-all duration-300 cursor-pointer h-full flex flex-col ${
                    isHovered ? `bg-gradient-to-br ${section.hoverColor}` : ""
                  }`}
                >
                  <div className="p-8 flex items-center justify-center">
                    <Icon size={48} color="white" />
                  </div>

                  <div className="bg-white bg-opacity-90 p-6 flex-grow">
                    <h2 className="text-xl font-bold mb-3 text-slate-800">
                      {section.name}
                    </h2>
                    <p className="text-slate-600">{section.description}</p>

                    <div className="mt-6 flex justify-end">
                      <button
                        className={`px-4 py-2 rounded-full text-white font-medium text-sm transition-all ${
                          isHovered || isSelected
                            ? section.color
                            : "bg-slate-600"
                        }`}
                      >
                        Go
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>Select a role to begin shaping emotional connections.</p>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;