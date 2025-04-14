import React, { useState } from "react";
import { Heart, Eye, BookOpen, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";


const DashboardSections = (props) => {
  const [hoveredSection, setHoveredSection] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const navigate = useNavigate();


  // Enhanced sections with more emotionally-focused descriptions and added icons
  const sections = [
    {
      id: "visuals",
      name: "Visual Journey",
      description:
        "Experience emotions through captivating videos, artwork, and visual stories that inspire and move you.",
      icon: Eye,
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      hoverColor: "from-purple-600 to-pink-600",
      route: "/User/UserVisuals",
    },
    {
      id: "cultural",
      name: "Emotional Stories",
      description:
        "Discover poems, letters, and stories that capture the depth and richness of human emotions across cultures.",
      icon: BookOpen,
      color: "bg-gradient-to-br from-blue-500 to-teal-500",
      hoverColor: "from-blue-600 to-teal-600",
    },
    {
      id: "meeting",
      name: "Connect & Share",
      description:
        "Join others in exploring emotions together through guided sessions and meaningful exchanges.",
      icon: Users,
      color: "bg-gradient-to-br from-amber-500 to-rose-500",
      hoverColor: "from-amber-600 to-rose-600",
      route: "/user/video-meet",
      
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
            <Heart className="text-rose-500" size={48} fill="currentColor" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
            Emotional Journey Dashboard
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore different paths to understand, build, and experience
            emotions through multimedia content.
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
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>Choose a path above to begin your emotional exploration journey</p>
        </div>
      </div>
    </div>
  );
};

// Default props to avoid errors when onSectionSelect is not provided
DashboardSections.defaultProps = {
  onSectionSelect: () => {},
};

export default DashboardSections;
