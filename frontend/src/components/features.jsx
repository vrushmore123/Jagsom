import {
  Film,
  PenTool,
  Users,
  Heart,
  BookOpen,
  Calendar,
  ArrowRight,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

const Features = () => {
  const AnimatedDiv = ({ children, className, delay = 0, initialY = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }, [delay]);

    const style = {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : `translateY(${initialY}px)`,
      transition: `opacity 0.6s ease, transform 0.6s ease`,
    };

    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  };
  const HoverCard = ({ children, className }) => {
    const [isHovered, setIsHovered] = useState(false);

    const style = {
      transform: isHovered ? "translateY(-10px)" : "translateY(0)",
      transition: "transform 0.3s ease",
    };

    return (
      <div
        className={className}
        style={style}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>
    );
  };

  const features = [
    {
      title: "Visual Expressions",
      description:
        "Explore our curated gallery of handwritten letters and emotional visuals from our global database. Each piece tells a unique story of human connection.",
      icon: <PenTool className="w-10 h-10 text-white" />,
      action: "Explore Visuals",
      color: "from-pink-500 to-purple-600",
      hoverColor: "from-pink-600 to-purple-700",
    },
    {
      title: "Cultural Perspectives",
      description:
        "Dive into diverse cultural perspectives through emotional content curated from communities around the world. Discover how emotions transcend borders.",
      icon: <Film className="w-10 h-10 text-white" />,
      action: "View Culture",
      color: "from-blue-400 to-teal-500",
      hoverColor: "from-blue-500 to-teal-600",
    },
    {
      title: "Live Connections",
      description:
        "Engage with emotional storytellers via interactive video sessions and live events. Build meaningful connections through shared emotional experiences.",
      icon: <Users className="w-10 h-10 text-white" />,
      action: "Join Meetings",
      color: "from-orange-400 to-pink-500",
      hoverColor: "from-orange-500 to-pink-600",
    },
  ];
  return (
    <>
      <div className="py-16 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedDiv
              className="text-3xl font-bold text-indigo-700 mb-4"
              delay={0.2}
              initialY={-20}
            >
              Explore Our Features
            </AnimatedDiv>
            <AnimatedDiv
              className="max-w-2xl mx-auto text-lg text-indigo-600"
              delay={0.4}
              initialY={20}
            >
              Comprehensive tools designed to help you understand, express, and
              connect through emotions
            </AnimatedDiv>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <HoverCard key={index} className="h-full">
                <AnimatedDiv
                  delay={0.4 + index * 0.2}
                  initialY={30}
                  className="h-full"
                >
                  <div
                    className={`rounded-2xl shadow-xl h-full p-8 bg-white text-center flex flex-col items-center gap-4 overflow-hidden relative`}
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-r ${feature.color} -mx-8 -mt-8`}
                    ></div>
                    <div className="p-4 rounded-full bg-white shadow-lg mb-2 z-10 mt-8">
                      {feature.icon}
                    </div>
                    <h2 className="text-2xl font-bold">{feature.title}</h2>
                    <p className="text-gray-700 flex-grow">
                      {feature.description}
                    </p>
                    <button
                      className={`mt-6 px-6 py-3 bg-gradient-to-r ${feature.color} hover:${feature.hoverColor} text-white rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-2 transform hover:scale-105`}
                    >
                      {feature.action}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </AnimatedDiv>
              </HoverCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
