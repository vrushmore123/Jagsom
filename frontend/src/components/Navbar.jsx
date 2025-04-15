import { useState, useEffect, useRef } from 'react';
import { Sparkles, Zap, Box, Globe, Users, Menu, X, Sun, Moon, ChevronRight } from 'lucide-react';

export default function MorphingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [hoverItem, setHoverItem] = useState(null);
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: <Globe className="w-4 h-4" /> },
    { id: 'features', label: 'Innovations', icon: <Zap className="w-4 h-4" /> },
    { id: 'solutions', label: 'Solutions', icon: <Box className="w-4 h-4" /> },
    { id: 'vision', label: 'Vision', icon: <Users className="w-4 h-4" /> },
  ];

  // Adaptive styles based on theme
  const styles = {
    nav: {
      base: `fixed w-full z-50 transition-all duration-500`,
      scrolled: {
        dark: 'bg-gray-900/85 backdrop-blur-xl border-b border-gray-800/50 shadow-lg shadow-purple-900/10',
        light: 'bg-white/85 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-blue-200/20'
      },
      expanded: {
        dark: 'bg-gray-900/85 backdrop-blur-xl shadow-lg shadow-purple-900/10',
        light: 'bg-white/85 backdrop-blur-xl shadow-lg shadow-blue-200/20'
      },
      notScrolled: {
        dark: 'bg-transparent',
        light: 'bg-transparent'
      }
    },
    logo: {
      text: {
        dark: 'text-white',
        light: 'text-gray-900'
      },
      accent: {
        dark: 'text-purple-400',
        light: 'text-indigo-600'
      }
    },
    item: {
      base: 'relative rounded-full transition-all duration-300',
      active: {
        dark: 'text-white',
        light: 'text-indigo-700'
      },
      inactive: {
        dark: 'text-gray-400 hover:text-white',
        light: 'text-gray-600 hover:text-indigo-700'
      },
      activeBackground: {
        dark: 'bg-gray-800',
        light: 'bg-indigo-50'
      },
      hoverBackground: {
        dark: 'hover:bg-gray-800/70',
        light: 'hover:bg-indigo-50/70'
      }
    },
    button: {
      primary: {
        dark: 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-900/20',
        light: 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-500/20'
      },
      secondary: {
        dark: 'bg-gray-800 text-white hover:bg-gray-700',
        light: 'bg-gray-100 text-gray-900 hover:bg-gray-200'
      }
    },
    mobileMenu: {
      dark: 'bg-gray-900 border-t border-gray-800',
      light: 'bg-white border-t border-gray-200'
    },
    themeSwitcher: {
      dark: 'bg-gray-800 text-gray-200',
      light: 'bg-gray-100 text-gray-800'
    }
  };

  return (
    <nav 
      ref={navRef}
      className={`${styles.nav.base} ${
        scrolled 
          ? styles.nav.scrolled[theme]
          : isExpanded 
            ? styles.nav.expanded[theme] 
            : styles.nav.notScrolled[theme]
      } ${scrolled ? 'py-2' : 'py-4'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="/" 
              className="flex items-center group transition-all duration-300 hover:scale-105"
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
            >
              <div className="relative">
                <div className={`absolute inset-0 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-violet-600/70 group-hover:bg-violet-500/70'
                    : 'bg-indigo-500/50 group-hover:bg-indigo-400/50'
                }`}></div>
                <div className={`relative flex items-center justify-center h-10 w-10 rounded-full ${
                  theme === 'dark' 
                    ? 'bg-gray-900/80' 
                    : 'bg-white/80'
                }`}>
                  <Sparkles className={`h-5 w-5 ${theme === 'dark' ? 'text-violet-400' : 'text-indigo-500'}`} />
                </div>
              </div>
              <div className="ml-3 flex flex-col">
                <span className={`text-xl font-bold ${styles.logo.text[theme]}`}>
                  <span className={styles.logo.accent[theme]}>EMOTION BUILDER</span>
                </span>
                <span className={`text-xs -mt-1 font-light ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                 
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Main Nav Items */}
            <div className={`flex items-center px-2 py-1 mx-2 rounded-full transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-gray-800/50 backdrop-blur-md border border-gray-700/50' 
                : 'bg-white/80 backdrop-blur-md border border-gray-200/80 shadow-sm'
            }`}>
              {navItems.map(item => (
                <a 
                  key={item.id}
                  href={`#${item.id}`}
                  className={`group ${styles.item.base} px-4 py-2 mx-1 flex items-center ${
                    activeLink === item.id 
                      ? `${styles.item.activeBackground[theme]} ${styles.item.active[theme]}`
                      : `${styles.item.inactive[theme]} ${styles.item.hoverBackground[theme]}`
                  }`}
                  onMouseEnter={() => setHoverItem(item.id)}
                  onMouseLeave={() => setHoverItem(null)}
                  onClick={(e) => { e.preventDefault(); setActiveLink(item.id); }}
                >
                  <div className="flex items-center">
                    <span className={`mr-2 transition-all duration-300 ${
                      activeLink === item.id 
                        ? theme === 'dark' ? 'text-violet-400' : 'text-indigo-600'
                        : theme === 'dark' ? 'text-gray-400 group-hover:text-violet-400' : 'text-gray-500 group-hover:text-indigo-600'
                    }`}>
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium">
                      {item.label}
                    </span>
                  </div>
                  
                  {/* Subtle indicator for active item */}
                  {activeLink === item.id && (
                    <span className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                      theme === 'dark' ? 'bg-violet-400' : 'bg-indigo-600'
                    }`}></span>
                  )}
                </a>
              ))}
            </div>
            
            {/* Right side items */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 ${styles.themeSwitcher[theme]}`}
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>

              {/* Action Button */}
              <a 
                href="/select-role" 
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${styles.button.primary[theme]}`}
              >
                <span>Get Started</span>
                <div className="relative ml-2 group-hover:ml-3 transition-all duration-300">
                  <ChevronRight className="h-4 w-4" />
                  <Sparkles className="absolute top-0 left-0 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Theme Toggle (Mobile) */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${styles.themeSwitcher[theme]}`}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full transition-all duration-300 ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:bg-gray-800' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <Menu className="block h-5 w-5" />
              ) : (
                <X className="block h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden">
          <div className={`px-2 pt-2 pb-4 space-y-1 backdrop-blur-xl animate-fadeDown ${styles.mobileMenu[theme]}`}>
            {navItems.map(item => (
              <a 
                key={item.id}
                href={`#${item.id}`}
                className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeLink === item.id 
                    ? theme === 'dark'
                      ? 'bg-gray-800 text-white'
                      : 'bg-indigo-50 text-indigo-700'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-800/70 hover:text-white'
                      : 'text-gray-700 hover:bg-indigo-50/70 hover:text-indigo-700'
                }`}
                onClick={(e) => { e.preventDefault(); setActiveLink(item.id); setIsOpen(false); }}
              >
                <span className="flex items-center">
                  <span className={`mr-3 ${
                    activeLink === item.id 
                      ? theme === 'dark' ? 'text-violet-400' : 'text-indigo-600'
                      : ''
                  }`}>
                    {item.icon}
                  </span>
                  {item.label}
                </span>
                {activeLink === item.id && (
                  <Zap className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-violet-400' : 'text-indigo-500'
                  }`} />
                )}
              </a>
            ))}
            
            {/* Action button for mobile */}
            <div className="pt-2">
              <a 
                href="#demo" 
                className={`flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium ${styles.button.primary[theme]}`}
                onClick={() => setIsOpen(false)}
              >
                Experience the Dimension
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
      
      {/* Keyframes for animations */}
      <style jsx>{`
        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeDown {
          animation: fadeDown 0.3s ease-out forwards;
        }
      `}</style>
    </nav>
  );
}