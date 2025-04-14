import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatorLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Attempting login with:", formData);

      const response = await fetch("http://localhost:3000/api/creators/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // 🔥 Store token and creatorId separately
      localStorage.setItem("token", data.token);
      localStorage.setItem("creatorId", data.creatorId); // Make sure this runs
      console.log("Creator ID:", data.creatorId);

      // ✅ Navigate to creator dashboard
      navigate("/creator/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      alert(err.message || "Login failed");
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
      background: "linear-gradient(to bottom right, #f0f5ff, #f5f0ff)",
      padding: "20px",
      fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
    },
    card: {
      width: "100%",
      maxWidth: "450px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    },
    cardHeader: {
      background: "linear-gradient(to right, #4f46e5, #7c3aed)",
      padding: "28px 24px",
      color: "white",
      textAlign: "center",
    },
    cardTitle: {
      fontSize: "24px",
      fontWeight: "700",
      margin: "0 0 8px 0",
    },
    cardSubtitle: {
      fontSize: "15px",
      fontWeight: "400",
      margin: "0",
      opacity: "0.85",
    },
    cardBody: {
      padding: "32px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#374151",
    },
    inputWrapper: {
      position: "relative",
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
      transition: "all 0.2s ease",
    },
    inputHover: {
      borderColor: "#a5b4fc",
    },
    inputFocus: {
      borderColor: "#4f46e5",
      boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.2)",
      outline: "none",
    },
    inputIcon: {
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#9ca3af",
      width: "18px",
      height: "18px",
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
      padding: "0",
    },
    checkbox: {
      width: "16px",
      height: "16px",
      accentColor: "#4f46e5",
    },
    checkboxLabel: {
      fontSize: "14px",
      color: "#4b5563",
      marginLeft: "8px",
    },
    rememberForgotRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    rememberMeContainer: {
      display: "flex",
      alignItems: "center",
    },
    forgotPasswordLink: {
      fontSize: "14px",
      color: "#4f46e5",
      textDecoration: "none",
      fontWeight: "500",
    },
    forgotPasswordLinkHover: {
      color: "#4338ca",
      textDecoration: "underline",
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
      boxShadow: "0 4px 6px rgba(79, 70, 229, 0.25)",
    },
    buttonHover: {
      backgroundColor: "#4338ca",
      transform: "translateY(-2px)",
      boxShadow: "0 6px 10px rgba(79, 70, 229, 0.3)",
    },
    buttonDisabled: {
      backgroundColor: "#818cf8",
      cursor: "not-allowed",
      transform: "none",
      boxShadow: "none",
    },
    spinner: {
      animation: "spin 1s linear infinite",
      marginRight: "10px",
      width: "16px",
      height: "16px",
    },
    registerContainer: {
      marginTop: "32px",
      textAlign: "center",
      color: "#4b5563",
      fontSize: "15px",
    },
    registerLink: {
      color: "#4f46e5",
      fontWeight: "600",
      textDecoration: "none",
      cursor: "pointer",
    },
    registerLinkHover: {
      color: "#4338ca",
      textDecoration: "underline",
    },
    divider: {
      marginTop: "32px",
      marginBottom: "24px",
      borderTop: "1px solid #e5e7eb",
      position: "relative",
      textAlign: "center",
    },
    dividerText: {
      position: "absolute",
      top: "-12px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "0 16px",
      backgroundColor: "white",
      color: "#6b7280",
      fontSize: "14px",
    },
    socialButtons: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
    },
    socialButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "44px",
      height: "44px",
      borderRadius: "8px",
      border: "1px solid #e5e7eb",
      backgroundColor: "white",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    socialButtonHover: {
      backgroundColor: "#f9fafb",
      transform: "translateY(-2px)",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
    },
    socialIcon: {
      width: "20px",
      height: "20px",
      color: "#4b5563",
    },
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
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    ),
    google: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={styles.socialIcon}
      >
        <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
      </svg>
    ),
    github: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={styles.socialIcon}
      >
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
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
          <h2 style={styles.cardTitle}>Creator Login</h2>
          <p style={styles.cardSubtitle}>Sign in to your creator dashboard</p>
        </div>

        <div style={styles.cardBody}>
          <form style={styles.form} onSubmit={handleLogin}>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email Address
              </label>
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
                  onFocus={(e) =>
                    (e.target.style.cssText = `
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
                  `)
                  }
                  onBlur={(e) =>
                    (e.target.style.cssText = `
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
                  `)
                  }
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
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
                  onFocus={(e) =>
                    (e.target.style.cssText = `
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
                  `)
                  }
                  onBlur={(e) =>
                    (e.target.style.cssText = `
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
                  `)
                  }
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

            {/* <div style={styles.rememberForgotRow}>
              <div style={styles.rememberMeContainer}>
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  style={styles.checkbox}
                />F
                <label htmlFor="remember-me" style={styles.checkboxLabel}>
                  Remember me
                </label>
              </div> */}
            {/* <button 
                type="button" 
                style={styles.forgotPasswordLink}
                onMouseOver={(e) => e.target.style.color = "#4338ca"}
                onMouseOut={(e) => e.target.style.color = "#4f46e5"}
              >
                Forgot password?
              </button> */}
            {/* </div> */}

            <button
              type="submit"
              disabled={isLoading}
              style={
                isLoading
                  ? { ...styles.button, ...styles.buttonDisabled }
                  : styles.button
              }
              onMouseOver={(e) =>
                !isLoading &&
                ((e.target.style.backgroundColor = "#4338ca"),
                (e.target.style.transform = "translateY(-2px)"),
                (e.target.style.boxShadow =
                  "0 6px 10px rgba(79, 70, 229, 0.3)"))
              }
              onMouseOut={(e) =>
                !isLoading &&
                ((e.target.style.backgroundColor = "#4f46e5"),
                (e.target.style.transform = ""),
                (e.target.style.boxShadow =
                  "0 4px 6px rgba(79, 70, 229, 0.25)"))
              }
            >
              {isLoading ? (
                <>
                  {icons.spinner}
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div style={styles.registerContainer}>
            <p>
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/creator/register")}
                style={styles.registerLink}
                onMouseOver={(e) => (
                  (e.target.style.color = "#4338ca"),
                  (e.target.style.textDecoration = "underline")
                )}
                onMouseOut={(e) => (
                  (e.target.style.color = "#4f46e5"),
                  (e.target.style.textDecoration = "none")
                )}
              >
                Register now
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorLogin;
