import React, { useState, useEffect } from "react";
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
import Footer from "../components/footer";
import Features from "../components/features";
import { Link } from "react-router-dom";

// Since we can't use framer-motion directly, we'll create a simple animation component
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

const testimonials = [
  {
    name: "Sophia Chen",
    role: "Emotional Intelligence Coach",
    text: "Emotion Builder has transformed how I help clients connect with their feelings. The visual tools are revolutionary.",
    avatar: "/api/placeholder/64/64",
    color: "bg-gradient-to-r from-purple-100 to-pink-100",
  },
  {
    name: "Marcus Johnson",
    role: "Community Leader",
    text: "Our organization has seen incredible growth in interpersonal connections since implementing these emotional intelligence resources.",
    avatar: "/api/placeholder/64/64",
    color: "bg-gradient-to-r from-blue-100 to-teal-100",
  },
  {
    name: "Aisha Patel",
    role: "Educational Researcher",
    text: "The cultural perspectives section offers invaluable insights for my work on emotional development across different societies.",
    avatar: "/api/placeholder/64/64",
    color: "bg-gradient-to-r from-orange-100 to-pink-100",
  },
];

const upcomingEvents = [
  {
    title: "Emotional Intelligence Workshop",
    date: "April 20, 2025",
    type: "Virtual",
  },
  {
    title: "Cross-Cultural Emotion Exhibition",
    date: "May 5, 2025",
    type: "In-Person",
  },
  {
    title: "Storytelling Through Emotions",
    date: "May 15, 2025",
    type: "Hybrid",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("about");
  const [emotionBubble, setEmotionBubble] = useState("Connection");

  useEffect(() => {
    const interval = setInterval(() => {
      const emotions = [
        "Joy",
        "Trust",
        "Fear",
        "Surprise",
        "Sadness",
        "Anticipation",
        "Anger",
        "Disgust",
      ];
      const randomEmotion =
        emotions[Math.floor(Math.random() * emotions.length)];
      setEmotionBubble(randomEmotion);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Floating animation for emotion bubble
  const [yPosition, setYPosition] = useState(0);

  useEffect(() => {
    let direction = 1;
    const animation = setInterval(() => {
      setYPosition((prev) => {
        if (prev > 10) direction = -1;
        if (prev < -10) direction = 1;
        return prev + direction;
      });
    }, 50);

    return () => clearInterval(animation);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="absolute inset-0 bg-indigo-500 opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <AnimatedDiv
              className="inline-block p-3 bg-white rounded-full mb-4 shadow-lg"
              delay={0.2}
              initialY={-20}
            >
              <Heart className="w-6 h-6 text-pink-500" />
            </AnimatedDiv>

            <AnimatedDiv
              className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-md"
              delay={0.4}
              initialY={-30}
            >
              Emotion Builder
            </AnimatedDiv>

            <AnimatedDiv
              className="max-w-2xl mx-auto text-xl text-white mb-8 opacity-90"
              delay={0.6}
              initialY={30}
            >
              Build deeper connections through emotional intelligence. Discover,
              understand, and express emotions in meaningful ways.
            </AnimatedDiv>

            <AnimatedDiv
              className="flex flex-col sm:flex-row justify-center gap-4"
              delay={0.8}
              initialY={20}
            >
              <Link to="/select-role">
                <button className="px-8 py-3 bg-white text-purple-600 rounded-lg font-medium shadow-lg hover:bg-opacity-90 transition transform hover:-translate-y-1">
                  Get Started
                </button>
              </Link>
              <button className="px-8 py-3 bg-purple-700 bg-opacity-40 text-white rounded-lg font-medium shadow-lg border border-white border-opacity-30 hover:bg-opacity-50 transition transform hover:-translate-y-1">
                Watch Demo
              </button>
            </AnimatedDiv>
          </div>

          {/* Floating Emotion Bubble */}
          <div
            className="absolute right-10 top-20 bg-white p-3 rounded-xl shadow-lg"
            style={{
              transform: `translateY(${yPosition}px)`,
              transition: "transform 0.1s ease-in-out",
            }}
          >
            <div className="text-sm font-medium text-gray-500">
              Today's Emotion:
            </div>
            <div className="text-lg font-bold text-pink-600">
              {emotionBubble}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <AnimatedDiv className="p-6" delay={0.2} initialY={20}>
              <p className="text-3xl font-bold text-pink-500">10K+</p>
              <p className="text-gray-600">Emotion Resources</p>
            </AnimatedDiv>
            <AnimatedDiv className="p-6" delay={0.4} initialY={20}>
              <p className="text-3xl font-bold text-teal-500">50+</p>
              <p className="text-gray-600">Cultural Perspectives</p>
            </AnimatedDiv>
            <AnimatedDiv className="p-6" delay={0.6} initialY={20}>
              <p className="text-3xl font-bold text-indigo-500">25K+</p>
              <p className="text-gray-600">Community Members</p>
            </AnimatedDiv>
            <AnimatedDiv className="p-6" delay={0.8} initialY={20}>
              <p className="text-3xl font-bold text-orange-500">100+</p>
              <p className="text-gray-600">Monthly Events</p>
            </AnimatedDiv>
          </div>
        </div>
      </div>

      <Features />

      {/* Testimonials Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedDiv
              className="text-3xl font-bold text-purple-700 mb-4"
              delay={0.2}
              initialY={-20}
            >
              Community Voices
            </AnimatedDiv>
            <AnimatedDiv
              className="max-w-2xl mx-auto text-lg text-purple-600"
              delay={0.4}
              initialY={20}
            >
              Hear from those who have transformed their emotional connections
            </AnimatedDiv>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <AnimatedDiv key={index} delay={0.4 + index * 0.2} initialY={20}>
                <div
                  className={`rounded-2xl shadow-md p-6 ${testimonial.color} flex flex-col gap-4`}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border-2 border-white shadow"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </div>
              </AnimatedDiv>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Information Tabs */}
      <div className="py-16 bg-indigo-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex border-b bg-gradient-to-r from-purple-100 to-pink-100">
              <button
                className={`px-6 py-4 text-sm font-medium flex items-center gap-2 ${
                  activeTab === "about"
                    ? "text-pink-600 border-b-2 border-pink-600 bg-white"
                    : "text-gray-700 hover:text-pink-600"
                }`}
                onClick={() => setActiveTab("about")}
              >
                <BookOpen className="w-4 h-4" />
                About Us
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium flex items-center gap-2 ${
                  activeTab === "events"
                    ? "text-pink-600 border-b-2 border-pink-600 bg-white"
                    : "text-gray-700 hover:text-pink-600"
                }`}
                onClick={() => setActiveTab("events")}
              >
                <Calendar className="w-4 h-4" />
                Upcoming Events
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium flex items-center gap-2 ${
                  activeTab === "faq"
                    ? "text-pink-600 border-b-2 border-pink-600 bg-white"
                    : "text-gray-700 hover:text-pink-600"
                }`}
                onClick={() => setActiveTab("faq")}
              >
                <MessageCircle className="w-4 h-4" />
                FAQ
              </button>
            </div>

            <div className="p-6">
              {activeTab === "about" && (
                <div>
                  <h3 className="text-xl font-bold mb-4 text-indigo-700">
                    Our Mission
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Emotion Builder was founded in 2023 with a mission to help
                    people develop deeper emotional intelligence and foster more
                    meaningful connections. We believe that understanding
                    emotions is the key to personal growth and healthier
                    relationships.
                  </p>
                  <p className="text-gray-700">
                    Our team of psychologists, cultural experts, and
                    communication specialists work together to create resources
                    that bridge emotional gaps across diverse backgrounds and
                    experiences.
                  </p>
                </div>
              )}

              {activeTab === "events" && (
                <div>
                  <h3 className="text-xl font-bold mb-4 text-indigo-700">
                    Upcoming Events
                  </h3>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 hover:bg-purple-50 rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-gray-600">{event.date}</p>
                        </div>
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${
                            event.type === "Virtual"
                              ? "bg-pink-100 text-pink-800"
                              : event.type === "In-Person"
                              ? "bg-teal-100 text-teal-800"
                              : "bg-indigo-100 text-indigo-800"
                          }`}
                        >
                          {event.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "faq" && (
                <div>
                  <h3 className="text-xl font-bold mb-4 text-indigo-700">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <button className="flex justify-between w-full text-left font-medium py-2 text-pink-600">
                        <span>
                          How can Emotion Builder help my organization?
                        </span>
                        <ChevronDown className="w-5 h-5" />
                      </button>
                      <p className="text-gray-700 mt-2">
                        Our platform provides tools for team-building, conflict
                        resolution, and communication enhancement that improve
                        workplace culture and productivity.
                      </p>
                    </div>
                    <div>
                      <button className="flex justify-between w-full text-left font-medium py-2 text-pink-600">
                        <span>Do you offer personalized coaching?</span>
                        <ChevronDown className="w-5 h-5" />
                      </button>
                      <p className="text-gray-700 mt-2">
                        Yes, we offer one-on-one coaching sessions with
                        certified emotional intelligence specialists who can
                        tailor programs to your specific needs.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-16 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedDiv
            className="text-3xl font-bold mb-4 drop-shadow-md"
            delay={0.2}
            initialY={-20}
          >
            Stay Connected
          </AnimatedDiv>
          <AnimatedDiv
            className="max-w-2xl mx-auto text-lg text-white opacity-90 mb-8"
            delay={0.4}
            initialY={20}
          >
            Join our community and receive the latest research, event
            invitations, and emotional intelligence resources
          </AnimatedDiv>

          <AnimatedDiv
            className="max-w-md mx-auto flex gap-2"
            delay={0.6}
            initialY={20}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-300 shadow-md"
            />
            <button className="px-6 py-3 bg-white text-pink-600 rounded-lg font-medium hover:bg-pink-50 transition shadow-md">
              Subscribe
            </button>
          </AnimatedDiv>
        </div>
      </div>

      <Footer />
    </div>
  );
}
