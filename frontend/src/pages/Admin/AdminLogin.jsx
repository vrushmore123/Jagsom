import { useState } from "react";

const AdminLogin = () => {
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
      // Using fetch instead of axios to avoid dependencies
      const response = await fetch("https://jagsom-2.onrender.com/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      
      localStorage.setItem("adminToken", data.token);
      setMessage({ text: "Login Successful! Redirecting...", type: "success" });
      
      // Simulate redirection without react-router
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1500);
    } catch (err) {
      setMessage({ text: err.message || "Login failed", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // CSS styles
  const styles = {
    pageContainer: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(to bottom right, #f3f4f6, #e5e7eb)",
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
      background: "linear-gradient(to right, #10b981, #059669)",
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
      padding: "32px"
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
    inputHover: {
      borderColor: "#a5f3c4"
    },
    inputFocus: {
      borderColor: "#10b981",
      boxShadow: "0 0 0 3px rgba(16, 185, 129, 0.2)",
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
      backgroundColor: "#10b981",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 6px rgba(16, 185, 129, 0.25)"
    },
    buttonHover: {
      backgroundColor: "#059669",
      transform: "translateY(-2px)",
      boxShadow: "0 6px 10px rgba(16, 185, 129, 0.3)"
    },
    buttonDisabled: {
      backgroundColor: "#6ee7b7",
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
    message: {
      marginTop: "24px",
      padding: "12px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "500",
      textAlign: "center"
    },
    success: {
      backgroundColor: "#ecfdf5",
      color: "#059669",
      border: "1px solid #a7f3d0"
    },
    error: {
      backgroundColor: "#fef2f2",
      color: "#dc2626",
      border: "1px solid #fecaca"
    },
    registerText: {
      marginTop: "24px",
      fontSize: "14px",
      color: "#6b7280",
      textAlign: "center"
    },
    registerLink: {
      color: "#10b981",
      fontWeight: "600",
      cursor: "pointer",
      textDecoration: "none",
      transition: "all 0.2s ease"
    },
    registerLinkHover: {
      color: "#059669",
      textDecoration: "underline"
    }
  };

  // SVG icons
  const icons = {
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

  return (
    <div style={styles.pageContainer}>
      <style>{spinnerKeyframes}</style>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardTitle}>Admin Login</h2>
          <p style={styles.cardSubtitle}>Access your administrator account</p>
        </div>
        
        <div style={styles.cardBody}>
          <form style={styles.form} onSubmit={handleLogin}>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                {icons.email}
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  placeholder="you@example.com"
                  onChange={handleChange}
                  style={styles.input}
                  onFocus={(e) => e.target.style.cssText = `
                    width: 100%;
                    padding: 12px 12px 12px 40px;
                    font-size: 15px;
                    line-height: 1.5;
                    color: #1f2937;
                    background-color: #fff;
                    border: 1px solid #10b981;
                    border-radius: 8px;
                    box-sizing: border-box;
                    transition: all 0.2s ease;
                    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
                    outline: none;
                  `}
                  onBlur={(e) => e.target.style.cssText = `
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
                  `}
                />
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
                  value={formData.password}
                  placeholder="••••••••"
                  onChange={handleChange}
                  style={styles.input}
                  onFocus={(e) => e.target.style.cssText = `
                    width: 100%;
                    padding: 12px 12px 12px 40px;
                    font-size: 15px;
                    line-height: 1.5;
                    color: #1f2937;
                    background-color: #fff;
                    border: 1px solid #10b981;
                    border-radius: 8px;
                    box-sizing: border-box;
                    transition: all 0.2s ease;
                    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
                    outline: none;
                  `}
                  onBlur={(e) => e.target.style.cssText = `
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
                  `}
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
            
            <button
              type="submit"
              disabled={isLoading}
              style={isLoading ? {...styles.button, ...styles.buttonDisabled} : styles.button}
              onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = "#059669", e.target.style.transform = "translateY(-2px)", e.target.style.boxShadow = "0 6px 10px rgba(16, 185, 129, 0.3)")}
              onMouseOut={(e) => !isLoading && (e.target.style.backgroundColor = "#10b981", e.target.style.transform = "", e.target.style.boxShadow = "0 4px 6px rgba(16, 185, 129, 0.25)")}
            >
              {isLoading ? (
                <>
                  {icons.spinner}
                  Processing...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
          
          {message.text && (
            <div style={{
              ...styles.message,
              ...(message.type === "success" ? styles.success : styles.error),
            }}>
              {message.text}
            </div>
          )}
          
          <div style={styles.registerText}>
            Need an admin account?{" "}
            <a 
              href="/admin/register" 
              style={styles.registerLink}
              onMouseOver={(e) => e.target.style.cssText = `
                color: #059669;
                font-weight: 600;
                cursor: pointer;
                text-decoration: underline;
                transition: all 0.2s ease;
              `}
              onMouseOut={(e) => e.target.style.cssText = `
                color: #10b981;
                font-weight: 600;
                cursor: pointer;
                text-decoration: none;
                transition: all 0.2s ease;
              `}
            >
              Register now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;