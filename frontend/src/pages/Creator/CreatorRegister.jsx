import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatorRegister = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "",
    age: "",
    category: "Visuals" // Default value from schema
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Using fetch instead of axios to avoid dependencies
      const response = await fetch("https://jagsom-2.onrender.com/api/creators/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          age: parseInt(formData.age),
          category: formData.category
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
      
      localStorage.setItem("creator", JSON.stringify(data));
      navigate("/creator/login");
    } catch (err) {
      alert(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  // SVG icons
  const icons = {
    user: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
    email: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
      >
        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
      </svg>
    ),
    lock: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
    eyeOpen: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="w-4 h-4"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    ),
    eyeClosed: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="w-4 h-4"
      >
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
        <line x1="2" x2="22" y1="2" y2="22"></line>
      </svg>
    ),
    spinner: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    ),
    age: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 6v6l4 2"></path>
      </svg>
    ),
    category: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
      >
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      </svg>
    ),
    chevronDown: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
      >
        <path d="m6 9 6 6 6-6"></path>
      </svg>
    )
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-5 font-sans">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-7 px-6 text-white text-center">
          <h2 className="text-2xl font-bold mb-2 text-white ml-26">Creator Registration</h2>
          <p className="text-sm opacity-85">Create your creator account</p>
        </div>
        
        <div className="p-8 max-h-[500px] overflow-y-auto custom-scrollbar">
          <form className="flex flex-col gap-6" onSubmit={handleRegister}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name</label>
              <div className="relative">
                {icons.user}
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</label>
              <div className="relative">
                {icons.email}
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="age" className="text-sm font-semibold text-gray-700">Age</label>
              <div className="relative">
                {icons.age}
                <input
                  id="age"
                  name="age"
                  type="number"
                  required
                  min="18"
                  placeholder="25"
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="text-sm font-semibold text-gray-700">Category</label>
              <div className="relative">
                {icons.category}
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="Visuals">Visuals</option>
                  <option value="Culture">Culture</option>
                  <option value="Meeting">Meeting</option>
                </select>
                {icons.chevronDown}
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                {icons.lock}
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-gray-400 cursor-pointer p-0 flex items-center justify-center"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? icons.eyeClosed : icons.eyeOpen}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">Confirm Password</label>
              <div className="relative">
                {icons.lock}
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-gray-400 cursor-pointer p-0 flex items-center justify-center"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? icons.eyeClosed : icons.eyeOpen}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition-all ${
                isLoading 
                  ? "bg-indigo-400 cursor-not-allowed" 
                  : "bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              } flex items-center justify-center shadow-indigo-200`}
            >
              {isLoading ? (
                <>
                  {icons.spinner}
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              Already have an account?{" "}
              <button
                onClick={() => navigate("/creator/login")}
                className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline cursor-pointer"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorRegister;