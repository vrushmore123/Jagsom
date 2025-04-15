import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  BookOpen,
  Calendar,
  MessageCircle,
  ChevronDown,
  Film,
  Users,
  Music,
  Layers,
  Globe,
  Video,
  Sparkles,
  Zap,
} from "lucide-react";
import Footer from "../components/footer";
import { Link } from "react-router-dom";

// Animated components
const FadeIn = ({ children, delay = 0, duration = 0.6, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${delay}s`,
        transitionDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  );
};

// Neon text effect component
const NeonText = ({ children, color = "text-pink-500", className = "" }) => (
  <span className={`${color} ${className} neon-text`}>{children}</span>
);

// Particle background animation
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 255, ${Math.random() * 0.5 + 0.2})`,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
      });
    }
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });
      
      requestAnimationFrame(draw);
    };
    
    draw();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 opacity-30"
    />
  );
};

// Pulsing circle animation
const PulsingCircle = ({ size = "h-4 w-4", color = "bg-pink-500" }) => {
  return (
    <div className="relative">
      <div className={`${size} ${color} rounded-full`}></div>
      <div className={`absolute inset-0 ${color} rounded-full animate-ping opacity-75`}></div>
    </div>
  );
};

const emotionsList = [
  "Joy", "Wonder", "Empathy", "Nostalgia", "Hope", 
  "Serenity", "Awe", "Love", "Excitement", "Gratitude"
];

const testimonials = [
  {
    name: "Sophia Chen",
    role: "Emotional Heritage Curator",
    text: "Emotion Builder has reconnected me with the fundamental human experiences we were losing to AI automation. The cultural archives are priceless.",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    name: "Marcus Johnson",
    role: "Community Connection Specialist",
    text: "In a world where digital replaces physical, this platform creates authentic emotional bonds I thought extinct. The live performances reconnect us to our humanity.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    name: "Aisha Patel",
    role: "Heritage Preservation Researcher",
    text: "The cultural preservation tools have saved countless traditions from being forgotten. Future generations will know what it meant to be human before the AI revolution.",
    gradient: "from-amber-500 to-orange-500",
  },
];

const upcomingEvents = [
  {
    title: "Neural-Enhanced Empathy Workshop",
    date: "June 12, 2045",
    type: "Holographic",
  },
  {
    title: "Lost Traditions Exhibition: Southeast Asian Ceremonies",
    date: "June 25, 2045",
    type: "Immersive VR",
  },
  {
    title: "Pre-AI Revolution Music Festival",
    date: "July 8, 2045",
    type: "Live Performance",
  },
];

const features = [
  {
    icon: <Film className="h-10 w-10" />,
    title: "Live Performances",
    description: "Experience authentic emotions through curated performances by human creators",
    gradient: "from-pink-600 to-purple-600",
  },
  {
    icon: <Layers className="h-10 w-10" />,
    title: "Cultural Archives",
    description: "Access forgotten rituals, traditions and ceremonies from pre-AI human civilization",
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    icon: <Music className="h-10 w-10" />,
    title: "Emotional Content",
    description: "Discover handcrafted poems, letters, and art created with authentic human feeling",
    gradient: "from-amber-600 to-orange-600",
  },
  {
    icon: <Video className="h-10 w-10" />,
    title: "Connection Sessions",
    description: "Schedule personal emotional support meetings with empathy specialists",
    gradient: "from-emerald-600 to-teal-600",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("about");
  const [currentEmotion, setCurrentEmotion] = useState(emotionsList[0]);
  const [emotionOpacity, setEmotionOpacity] = useState(1);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  // Emotion word cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setEmotionOpacity(0);
      setTimeout(() => {
        setCurrentEmotion(emotionsList[Math.floor(Math.random() * emotionsList.length)]);
        setEmotionOpacity(1);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-black opacity-80"></div>
        <ParticleBackground />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center items-center px-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-700 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-700 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
        
        <div className="z-10 max-w-7xl mx-auto text-center px-4 py-24 relative">
          <FadeIn delay={0.3}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900 bg-opacity-50 rounded-full border border-purple-500 mb-8">
              <PulsingCircle color="bg-pink-500" />
              <span className="text-pink-300 font-medium">Humanity's Revival Project • 2045</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.5} className="mb-6">
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
              Emotion Builder
            </h1>
            <div className="h-1 w-40 mx-auto bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-6"></div>
          </FadeIn>

          <FadeIn delay={0.7}>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-gray-300">
              Reclaiming humanity in an AI-dominated era. Experience authentic
              <span className="relative mx-2">
                <span 
                  className="absolute transition-opacity duration-500 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
                  style={{ opacity: emotionOpacity }}
                >
                  {currentEmotion}
                </span>
                <span className="opacity-0">{currentEmotion}</span>
              </span>
              once again.
            </p>
          </FadeIn>

          <FadeIn delay={0.9} className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Link to="/select-role">
              <button className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg font-bold shadow-lg hover:shadow-purple-500/30 transition duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
                <span className="relative z-10">Begin Your Journey</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </Link>
            
            {/* <button className="px-8 py-4 bg-gray-800 border border-purple-500 text-purple-300 rounded-lg font-bold shadow-lg hover:shadow-purple-500/20 transition duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>Experience Demo</span>
                <Sparkles className="w-5 h-5 text-purple-400 group-hover:animate-pulse" />
              </span>
              <span className="absolute inset-0 bg-purple-900 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
            </button> */}
          </FadeIn>

          <FadeIn delay={1.1} className="mt-16">
            <div className="inline-flex items-center gap-2 text-sm text-gray-400">
              <span>Scroll to explore</span>
              <div className="animate-bounce">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Stats Section with futuristic design */}
      <div className="relative z-10 py-16 bg-gray-900 bg-opacity-70 backdrop-blur-lg border-t border-b border-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <FadeIn delay={0.2} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-900 to-purple-900 opacity-20 rounded-xl blur"></div>
              <div className="relative p-6 rounded-xl border border-pink-800 bg-black bg-opacity-40">
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600">
                  25K+
                </p>
                <p className="text-gray-400 mt-2">Human Creators</p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.4} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-blue-900 opacity-20 rounded-xl blur"></div>
              <div className="relative p-6 rounded-xl border border-purple-800 bg-black bg-opacity-40">
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  150+
                </p>
                <p className="text-gray-400 mt-2">Cultural Archives</p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.6} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-cyan-900 opacity-20 rounded-xl blur"></div>
              <div className="relative p-6 rounded-xl border border-blue-800 bg-black bg-opacity-40">
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  50K+
                </p>
                <p className="text-gray-400 mt-2">Community Members</p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.8} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-900 to-teal-900 opacity-20 rounded-xl blur"></div>
              <div className="relative p-6 rounded-xl border border-teal-800 bg-black bg-opacity-40">
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                  300+
                </p>
                <p className="text-gray-400 mt-2">Monthly Events</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="relative z-10 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              Reclaiming Our Humanity
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              In a world dominated by artificial intelligence, we preserve what makes us uniquely human.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <FadeIn key={index} delay={0.4 + index * 0.1}>
                <div 
                  className="relative p-6 rounded-xl bg-gray-800 bg-opacity-50 border border-gray-700 h-full transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300`}></div>
                  <div className={`flex items-center justify-center w-16 h-16 rounded-lg mb-4 bg-gradient-to-br ${feature.gradient} text-white`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                  
                  <div className="mt-4 flex items-center text-sm">
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${feature.gradient} font-medium`}>Explore</span>
                    <Zap className={`ml-1 w-4 h-4 text-transparent bg-clip-text bg-gradient-to-r ${feature.gradient} transition-transform duration-300 ${hoveredFeature === index ? 'translate-x-1' : ''}`} />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative z-10 py-24 bg-black bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Human Testimonials
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Real stories from those who've reconnected with their emotional heritage
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <FadeIn key={index} delay={0.4 + index * 0.2}>
                <div className="relative p-8 rounded-xl bg-gray-900 border border-gray-800 h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-900/20">
                  <div className={`absolute h-1 top-0 left-0 right-0 bg-gradient-to-r ${testimonial.gradient} rounded-t-xl`}></div>
                  <p className="text-gray-300 italic mb-6">"{testimonial.text}"</p>
                  <div className="mt-auto">
                    <h3 className={`font-semibold text-transparent bg-clip-text bg-gradient-to-r ${testimonial.gradient}`}>
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Information Tabs */}
      <div className="relative z-10 py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2}>
            <div className="backdrop-blur-xl bg-gray-900 bg-opacity-40 rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
              <div className="flex border-b border-gray-800">
                <button
                  className={`px-6 py-4 text-sm font-medium flex items-center gap-2 transition-colors duration-300 ${
                    activeTab === "about"
                      ? "text-pink-500 border-b-2 border-pink-500 bg-gray-900 bg-opacity-70"
                      : "text-gray-400 hover:text-pink-400"
                  }`}
                  onClick={() => setActiveTab("about")}
                >
                  <BookOpen className="w-4 h-4" />
                  Our Mission
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium flex items-center gap-2 transition-colors duration-300 ${
                    activeTab === "events"
                      ? "text-pink-500 border-b-2 border-pink-500 bg-gray-900 bg-opacity-70"
                      : "text-gray-400 hover:text-pink-400"
                  }`}
                  onClick={() => setActiveTab("events")}
                >
                  <Calendar className="w-4 h-4" />
                  Upcoming Events
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium flex items-center gap-2 transition-colors duration-300 ${
                    activeTab === "faq"
                      ? "text-pink-500 border-b-2 border-pink-500 bg-gray-900 bg-opacity-70"
                      : "text-gray-400 hover:text-pink-400"
                  }`}
                  onClick={() => setActiveTab("faq")}
                >
                  <MessageCircle className="w-4 h-4" />
                  FAQ
                </button>
              </div>

              <div className="p-8">
                {activeTab === "about" && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                      Preserving What Makes Us Human
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Founded in 2042, Emotion Builder emerged as a response to the progressive emotional detachment observed in society as AI systems became increasingly dominant in daily life. Our mission is to preserve and rebuild the fundamental emotional connections that define humanity.
                    </p>
                    <p className="text-gray-300">
                      We've assembled a global network of emotion specialists, cultural anthropologists, and traditional artists to create a sanctuary for authentic human experience. Together, we're ensuring that future generations will know what it truly meant to feel, connect, and experience life as humans did before the AI revolution.
                    </p>
                  </div>
                )}

                {activeTab === "events" && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                      Upcoming Experiences
                    </h3>
                    <div className="space-y-4">
                      {upcomingEvents.map((event, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-4 bg-gray-800 bg-opacity-50 hover:bg-opacity-70 rounded-lg border border-gray-700 transition-all duration-300"
                        >
                          <div>
                            <h4 className="font-medium text-white">{event.title}</h4>
                            <p className="text-sm text-gray-400">{event.date}</p>
                          </div>
                          <span
                            className={`px-3 py-1 text-xs rounded-full ${
                              event.type === "Holographic"
                                ? "bg-pink-900 text-pink-300 border border-pink-700"
                                : event.type === "Immersive VR"
                                ? "bg-cyan-900 text-cyan-300 border border-cyan-700"
                                : "bg-purple-900 text-purple-300 border border-purple-700"
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
                    <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                      Frequently Asked Questions
                    </h3>
                    <div className="space-y-6">
                      <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
                        <button className="flex justify-between w-full text-left font-medium py-2 text-white">
                          <span>
                            How is Emotion Builder different from AI emotional simulations?
                          </span>
                          <ChevronDown className="w-5 h-5 text-pink-500" />
                        </button>
                        <p className="text-gray-300 mt-2">
                          Unlike AI simulations that mimic emotional responses, our platform connects you with genuine human emotional experiences and cultural traditions preserved from pre-AI dominance eras. Every interaction, performance, and artifact is created by humans with authentic emotional intelligence.
                        </p>
                      </div>
                      
                      <div className="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700">
                        <button className="flex justify-between w-full text-left font-medium py-2 text-white">
                          <span>Can I become an Emotion Specialist?</span>
                          <ChevronDown className="w-5 h-5 text-pink-500" />
                        </button>
                        <p className="text-gray-300 mt-2">
                          Yes, we're actively seeking individuals who demonstrate profound emotional intelligence and cultural awareness. Our certification program requires proven ability to connect authentically with others and a deep understanding of cultural emotional expressions. Apply through our Specialist Portal.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="relative z-10 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900 to-purple-900 opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <FadeIn delay={0.2}>
            <div className="relative bg-black bg-opacity-50 backdrop-blur-xl p-12 rounded-2xl border border-purple-800">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-600 rounded-full filter blur-3xl opacity-20"></div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                Join Our Human Collective
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">
                Stay connected with upcoming events, cultural preservation projects, and emotional wellness resources
              </p>

              <div className="max-w-md mx-auto">
                <div className="flex gap-2 bg-gray-900 bg-opacity-50 p-1 rounded-lg border border-gray-700">
                  <input
                    type="email"
                    placeholder="Enter your human identifier"
                    className="flex-grow px-4 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-900/30 transition-all duration-300 transform hover:-translate-y-1">
                    Connect
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  By joining, you confirm your status as a natural human entity eligible for emotional reclamation
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Custom Footer */}
      <div className="relative z-10 bg-black bg-opacity-70 backdrop-blur-lg border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-pink-500" />
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                  Emotion Builder
                </span>
              </div>
              <p className="text-gray-500 mt-2">Reclaiming humanity in 2045</p>
            </div>
            
            <div className="flex gap-8">
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Experience</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Live Performances</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Cultural Archives</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Emotional Support</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Heritage Preservation</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Community</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Become a Creator</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Connection Events</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Learning Hub</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Human Verification</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Contact</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>© 2045 Emotion Builder. Preserving humanity in the age of AI. All rights reserved.</p>
            <p className="mt-2">Certified by the Global Human Experience Preservation Council</p>
          </div>
        </div>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .float {
          animation: float 6s ease-in-out infinite;
        }
        
        .neon-text {
          text-shadow: 0 0 5px currentColor, 0 0 20px currentColor;
        }
      `}</style>
    </div>
  );
}