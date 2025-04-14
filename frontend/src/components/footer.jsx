const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-pink-400 mb-4">
                Emotion Builder
              </h3>
              <p className="text-sm">
                Building connections through emotional intelligence since 2023.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-indigo-300 mb-4">
                Features
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-pink-300 transition">
                    Visual Expressions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-300 transition">
                    Cultural Perspectives
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-300 transition">
                    Live Connections
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-indigo-300 mb-4">
                Resources
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-pink-300 transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-300 transition">
                    Research
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-300 transition">
                    Guides
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-indigo-300 mb-4">
                Contact
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-pink-300 transition">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-300 transition">
                    Partnerships
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-300 transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; 2025 Emotion Builder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
