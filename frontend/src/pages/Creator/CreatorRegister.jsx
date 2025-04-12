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
      const response = await fetch("http://localhost:3000/api/creators/register", {
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

  // CSS styles
  const styles = {
    pageContainer: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(to bottom right, #f0f5ff, #f5f0ff)",
      padding: "20px",
      fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
    },
    card: {
      width: "100%",
      maxWidth: "450px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      overflow: "hidden"
    },
    cardHeader: {
      background: "linear-gradient(to right, #4f46e5, #7c3aed)",
      padding: "28px 24px",
      color: "white",
      textAlign: "center"
    },
    cardTitle: {
      fontSize: "24px",
      fontWeight: "700",
      margin: "0 0 8px 0"
    },
    cardSubtitle: {
      fontSize: "15px",
      fontWeight: "400",
      margin: "0",
      opacity: "0.85"
    },
    cardBody: {
      padding: "32px",
      maxHeight: "500px",
      overflowY: "auto"
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "24px"
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    },
    label: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#374151"
    },
    inputWrapper: {
      position: "relative"
    },
    input: {
      width: "100%",
      padding: "12px 12px 12px 40px",
      fontSize: "15px",
      lineHeight: "1.5",
      color: "#1f2937",
      backgroundColor: "#fff",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      boxSizing: "border-box",
      transition: "all 0.2s ease"
    },
    selectInput: {
      width: "100%",
      padding: "12px 12px 12px 40px",
      fontSize: "15px",
      lineHeight: "1.5",
      color: "#1f2937",
      backgroundColor: "#fff",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      boxSizing: "border-box",
      transition: "all 0.2s ease",
      appearance: "none",
      cursor: "pointer"
    },
    inputHover: {
      borderColor: "#a5b4fc"
    },
    inputFocus: {
      borderColor: "#4f46e5",
      boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.2)",
      outline: "none"
    },
    inputIcon: {
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#9ca3af",
      width: "18px",
      height: "18px"
    },
    togglePasswordButton: {
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      color: "#9ca3af",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0"
    },
    button: {
      width: "100%",
      padding: "12px 16px",
      fontSize: "16px",
      fontWeight: "600",
      color: "white",
      backgroundColor: "#4f46e5",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 6px rgba(79, 70, 229, 0.25)"
    },
    buttonHover: {
      backgroundColor: "#4338ca",
      transform: "translateY(-2px)",
      boxShadow: "0 6px 10px rgba(79, 70, 229, 0.3)"
    },
    buttonDisabled: {
      backgroundColor: "#818cf8",
      cursor: "not-allowed",
      transform: "none",
      boxShadow: "none"
    },
    spinner: {
      animation: "spin 1s linear infinite",
      marginRight: "10px",
      width: "16px",
      height: "16px"
    },
    loginContainer: {
      marginTop: "32px",
      textAlign: "center",
      color: "#4b5563",
      fontSize: "15px"
    },
    loginLink: {
      color: "#4f46e5",
      fontWeight: "600",
      textDecoration: "none",
      cursor: "pointer"
    },
    loginLinkHover: {
      color: "#4338ca",
      textDecoration: "underline"
    },
    chevronDown: {
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none"
    }
  };

  // CSS for custom scrollbar
  const scrollbarStyles = `
    /* Custom scrollbar styles */
    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(241, 242, 255, 0.6);
      border-radius: 10px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: linear-gradient(to bottom, #4f46e5, #7c3aed);
      border-radius: 10px;
      transition: all 0.3s;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(to bottom, #4338ca, #6d28d9);
    }
  `;

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
        style={styles.inputIcon}
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
        style={styles.inputIcon}
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
        style={styles.inputIcon}
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
        width="18" 
        height="18"
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
        width="18" 
        height="18"
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
        style={styles.spinner}
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
        style={styles.inputIcon}
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
        style={styles.inputIcon}
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
        width="16" 
        height="16"
        style={styles.chevronDown}
      >
        <path d="m6 9 6 6 6-6"></path>
      </svg>
    )
  };

  // CSS keyframes for spinner
  const spinnerKeyframes = `
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;

  const focusStyle = `
    width: 100%;
    padding: 12px 12px 12px 40px;
    font-size: 15px;
    line-height: 1.5;
    color: #1f2937;
    background-color: #fff;
    border: 1px solid #4f46e5;
    border-radius: 8px;
    box-sizing: border-box;
    transition: all 0.2s ease;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
    outline: none;
  `;

  const blurStyle = `
    width: 100%;
    padding: 12px 12px 12px 40px;
    font-size: 15px;
    line-height: 1.5;
    color: #1f2937;
    background-color: #fff;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    box-sizing: border-box;
    transition: all 0.2s ease;
  `;

  return (
    <div style={styles.pageContainer}>
      <style>{spinnerKeyframes}</style>
      <style>{scrollbarStyles}</style>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardTitle}>Creator Registration</h2>
          <p style={styles.cardSubtitle}>Create your creator account</p>
        </div>
        
        <div style={styles.cardBody} className="custom-scrollbar">
          <form style={styles.form} onSubmit={handleRegister}>
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>Full Name</label>
              <div style={styles.inputWrapper}>
                {icons.user}
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  onChange={handleChange}
                  style={styles.input}
                  onFocus={(e) => e.target.style.cssText = focusStyle}
                  onBlur={(e) => e.target.style.cssText = blurStyle}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                {icons.email}
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  onChange={handleChange}
                  style={styles.input}
                  onFocus={(e) => e.target.style.cssText = focusStyle}
                  onBlur={(e) => e.target.style.cssText = blurStyle}
                />
              </div>
            </div>
            
            <div style={styles.formGroup}>
              <label htmlFor="age" style={styles.label}>Age</label>
              <div style={styles.inputWrapper}>
                {icons.age}
                <input
                  id="age"
                  name="age"
                  type="number"
                  required
                  min="18"
                  placeholder="25"
                  onChange={handleChange}
                  style={styles.input}
                  onFocus={(e) => e.target.style.cssText = focusStyle}
                  onBlur={(e) => e.target.style.cssText = blurStyle}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="category" style={styles.label}>Category</label>
              <div style={styles.inputWrapper}>
                {icons.category}
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  style={styles.selectInput}
                  onFocus={(e) => e.target.style.cssText = focusStyle + "appearance: none;"}
                  onBlur={(e) => e.target.style.cssText = blurStyle + "appearance: none;"}
                >
                  <option value="Visuals">Visuals</option>
                  <option value="Culture">Culture</option>
                  <option value="Meeting">Meeting</option>
                </select>
                {icons.chevronDown}
              </div>
            </div>
            
            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                {icons.lock}
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  onChange={handleChange}
                  style={styles.input}
                  onFocus={(e) => e.target.style.cssText = focusStyle}
                  onBlur={(e) => e.target.style.cssText = blurStyle}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={styles.togglePasswordButton}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? icons.eyeClosed : icons.eyeOpen}
                </button>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
              <div style={styles.inputWrapper}>
                {icons.lock}
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  onChange={handleChange}
                  style={styles.input}
                  onFocus={(e) => e.target.style.cssText = focusStyle}
                  onBlur={(e) => e.target.style.cssText = blurStyle}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  style={styles.togglePasswordButton}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? icons.eyeClosed : icons.eyeOpen}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              style={isLoading ? {...styles.button, ...styles.buttonDisabled} : styles.button}
              onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = "#4338ca", e.target.style.transform = "translateY(-2px)", e.target.style.boxShadow = "0 6px 10px rgba(79, 70, 229, 0.3)")}
              onMouseOut={(e) => !isLoading && (e.target.style.backgroundColor = "#4f46e5", e.target.style.transform = "", e.target.style.boxShadow = "0 4px 6px rgba(79, 70, 229, 0.25)")}
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
          
          <div style={styles.loginContainer}>
            <p>
              Already have an account?{" "}
              <button
                onClick={() => navigate("/creator/login")}
                style={styles.loginLink}
                onMouseOver={(e) => (e.target.style.color = "#4338ca", e.target.style.textDecoration = "underline")}
                onMouseOut={(e) => (e.target.style.color = "#4f46e5", e.target.style.textDecoration = "none")}
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