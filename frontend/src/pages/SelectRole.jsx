import React from "react";
import { useNavigate } from "react-router-dom";

const SelectRole = () => {
  const navigate = useNavigate();

  const goToLogin = (role) => {
    if (role === "user") {
      navigate("/user/login");
    } else if (role === "creator") {
      navigate("/creator/login");
    } else if (role === "admin") {
      navigate("/admin/login");
    }
  };

  // Styles
  const styles = {
    container: {
      textAlign: "center",
      padding: "2rem",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
    },
    content: {
      maxWidth: "800px",
      padding: "3rem",
      borderRadius: "24px",
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    heading: {
      fontSize: "2.8rem",
      fontWeight: "800",
      marginBottom: "1rem",
      background: "linear-gradient(to right, #fff, #e0e7ff)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-0.05em",
    },
    description: {
      fontSize: "1.2rem",
      marginBottom: "3rem",
      fontWeight: "400",
      opacity: 0.9,
      maxWidth: "600px",
      marginLeft: "auto",
      marginRight: "auto",
      lineHeight: "1.6",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "1.5rem",
      flexWrap: "wrap",
    },
    button: {
      padding: "1.2rem 2rem",
      fontSize: "1.1rem",
      cursor: "pointer",
      borderRadius: "14px",
      border: "none",
      background: "rgba(255, 255, 255, 0.1)",
      color: "white",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      fontWeight: "600",
      backdropFilter: "blur(5px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      minWidth: "220px",
      position: "relative",
      overflow: "hidden",
    },
    buttonHover: {
      transform: "translateY(-5px)",
      background: "rgba(255, 255, 255, 0.2)",
      boxShadow: "0 12px 25px rgba(0, 0, 0, 0.2)",
    },
    buttonActive: {
      transform: "translateY(0)",
    },
    buttonUser: {
      background: "linear-gradient(135deg, rgba(74, 222, 128, 0.8) 0%, rgba(34, 197, 94, 0.8) 100%)",
    },
    buttonCreator: {
      background: "linear-gradient(135deg, rgba(96, 165, 250, 0.8) 0%, rgba(59, 130, 246, 0.8) 100%)",
    },
    buttonAdmin: {
      background: "linear-gradient(135deg, rgba(168, 85, 247, 0.8) 0%, rgba(139, 92, 246, 0.8) 100%)",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Welcome to Our Platform</h1>
        <p style={styles.description}>
          Select your role to access the appropriate login portal. Each role provides different features and capabilities tailored to your needs.
        </p>
        
        <div style={styles.buttonContainer}>
          <button 
            style={{...styles.button, ...styles.buttonUser}}
            onClick={() => goToLogin("user")}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover)}
            onMouseLeave={(e) => {
              e.target.style.transform = "";
              e.target.style.background = styles.buttonUser.background;
            }}
            onMouseDown={(e) => Object.assign(e.target.style, styles.buttonActive)}
          >
            Login as User
          </button>
          
          <button 
            style={{...styles.button, ...styles.buttonCreator}}
            onClick={() => goToLogin("creator")}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover)}
            onMouseLeave={(e) => {
              e.target.style.transform = "";
              e.target.style.background = styles.buttonCreator.background;
            }}
            onMouseDown={(e) => Object.assign(e.target.style, styles.buttonActive)}
          >
            Login as Creator
          </button>
          
          <button 
            style={{...styles.button, ...styles.buttonAdmin}}
            onClick={() => goToLogin("admin")}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.buttonHover)}
            onMouseLeave={(e) => {
              e.target.style.transform = "";
              e.target.style.background = styles.buttonAdmin.background;
            }}
            onMouseDown={(e) => Object.assign(e.target.style, styles.buttonActive)}
          >
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;