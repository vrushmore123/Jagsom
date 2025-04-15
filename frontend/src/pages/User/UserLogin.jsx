import { useState } from "react";

const UserLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("https://jagsom-2.onrender.com/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      
      localStorage.setItem("user", JSON.stringify(data));
      setMessage({ text: "Login Successful! Redirecting...", type: "success" });
      
      setTimeout(() => {
        window.location.href = "/user/dashboard";
      }, 1500);
    } catch (err) {
      setMessage({ text: err.message || "Login failed", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-5 font-sans">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-700 py-7 px-6 text-white text-center">
          <h2 className="text-2xl font-bold mb-2 text-white ml-26">Welcome Back</h2>
          <p className="text-sm opacity-85">Sign in to continue to your account</p>
        </div>
        
        <div className="p-8">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</label>
              <div className="relative">
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
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  placeholder="name@example.com"
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg transition-all focus:border-blue-500 focus:ring-3 focus:ring-blue-200 outline-none"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center w-full">
                <label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</label>
                <a href="#" className="text-sm text-blue-500 hover:text-blue-700 font-medium transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
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
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg transition-all focus:border-blue-500 focus:ring-3 focus:ring-blue-200 outline-none"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-gray-400 cursor-pointer p-0 flex items-center justify-center"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
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
                  ) : (
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
                  )}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 text-sm font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          {message.text && (
            <div className={`mt-6 p-3 rounded-lg text-sm font-medium text-center ${
              message.type === "success" 
                ? "bg-blue-50 text-blue-800 border border-blue-100" 
                : "bg-red-50 text-red-800 border border-red-100"
            }`}>
              {message.text}
            </div>
          )}
          
          <div className="mt-6 text-sm text-gray-500 text-center">
            Don't have an account?{" "}
            <a 
              href="/user/register" 
              className="text-blue-500 font-semibold hover:text-blue-700 hover:underline transition-colors"
            >
              Create Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;