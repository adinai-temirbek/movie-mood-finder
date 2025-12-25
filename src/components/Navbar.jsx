// src/components/Navbar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Poppins:wght@400;600;700;900&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .nav-link {
          position: relative;
          overflow: hidden;
          color: white;
          text-decoration: none;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .nav-link::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        .nav-link:hover::before {
          width: 300px;
          height: 300px;
        }
        .nav-link:hover {
          transform: translateY(-3px);
        }
        
        /* Hamburger menu animation */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 6px;
          cursor: pointer;
          padding: 10px;
          z-index: 1001;
        }
        .hamburger span {
          width: 25px;
          height: 3px;
          background: white;
          border-radius: 3px;
          transition: all 0.3s ease;
        }
        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(8px, 8px);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(8px, -8px);
        }

        @media (max-width: 768px) {
          .hamburger {
            display: flex;
          }
          .nav-links {
            display: none !important;
          }
          .mobile-menu {
            display: flex !important;
          }
        }
      `}</style>

      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        background: "rgba(15, 23, 42, 0.85)",
        backdropFilter: "blur(20px)",
        padding: "15px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 1000,
        borderBottom: "1px solid rgba(236, 72, 153, 0.2)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
        animation: "slideDown 0.6s ease"
      }}>
        {/* Logo */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}>
          <div style={{
            fontSize: "2rem",
            background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 3s linear infinite"
          }}>
            <span className="emoji">🎬</span>
          </div>
          <span style={{
            fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
            fontWeight: "900",
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
            animation: "shimmer 3s linear infinite"
          }}>
            MOOD MOVIES
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="nav-links" style={{
          display: "flex",
          gap: "15px",
          alignItems: "center"
        }}>
          <NavLink
            to="/"
            className="nav-link"
            style={({ isActive }) => ({
              padding: "12px 28px",
              borderRadius: "50px",
              fontSize: "1rem",
              fontWeight: "600",
              fontFamily: "'Inter', sans-serif",
              background: isActive
                ? "linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(139, 92, 246, 0.3))"
                : "rgba(255, 255, 255, 0.05)",
              border: isActive
                ? "2px solid rgba(236, 72, 153, 0.8)"
                : "2px solid rgba(255, 255, 255, 0.1)",
              boxShadow: isActive
                ? "0 8px 32px rgba(236, 72, 153, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                : "0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
              position: "relative",
              zIndex: 1
            })}
          >
            <span className="emoji">🏠</span> Home
          </NavLink>

          <NavLink
            to="/all"
            className="nav-link"
            style={({ isActive }) => ({
              padding: "12px 28px",
              borderRadius: "50px",
              fontSize: "1rem",
              fontWeight: "600",
              fontFamily: "'Inter', sans-serif",
              background: isActive
                ? "linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(139, 92, 246, 0.3))"
                : "rgba(255, 255, 255, 0.05)",
              border: isActive
                ? "2px solid rgba(236, 72, 153, 0.8)"
                : "2px solid rgba(255, 255, 255, 0.1)",
              boxShadow: isActive
                ? "0 8px 32px rgba(236, 72, 153, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                : "0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
              position: "relative",
              zIndex: 1
            })}
          >
            <span className="emoji">🎞️</span> All Movies
          </NavLink>

          <NavLink
            to="/favorites"
            className="nav-link"
            style={({ isActive }) => ({
              padding: "12px 28px",
              borderRadius: "50px",
              fontSize: "1rem",
              fontWeight: "600",
              fontFamily: "'Inter', sans-serif",
              background: isActive
                ? "linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(139, 92, 246, 0.3))"
                : "rgba(255, 255, 255, 0.05)",
              border: isActive
                ? "2px solid rgba(236, 72, 153, 0.8)"
                : "2px solid rgba(255, 255, 255, 0.1)",
              boxShadow: isActive
                ? "0 8px 32px rgba(236, 72, 153, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                : "0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
              position: "relative",
              zIndex: 1
            })}
          >
            <span className="emoji">❤️</span> Favorites
          </NavLink>
        </div>

        {/* Hamburger Menu Button */}
        <div 
          className={`hamburger ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          className="mobile-menu"
          style={{
            display: "none",
            position: "fixed",
            top: "70px",
            left: 0,
            right: 0,
            background: "rgba(15, 23, 42, 0.98)",
            backdropFilter: "blur(20px)",
            padding: "20px",
            flexDirection: "column",
            gap: "15px",
            zIndex: 999,
            borderBottom: "1px solid rgba(236, 72, 153, 0.2)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
            animation: "slideDown 0.3s ease"
          }}
        >
          <NavLink
            to="/"
            onClick={() => setIsMenuOpen(false)}
            style={({ isActive }) => ({
              padding: "15px 20px",
              borderRadius: "12px",
              fontSize: "1.1rem",
              fontWeight: "600",
              fontFamily: "'Inter', sans-serif",
              background: isActive
                ? "linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(139, 92, 246, 0.3))"
                : "rgba(255, 255, 255, 0.05)",
              border: isActive
                ? "2px solid rgba(236, 72, 153, 0.8)"
                : "2px solid rgba(255, 255, 255, 0.1)",
              color: "white",
              textDecoration: "none",
              display: "block",
              textAlign: "center"
            })}
          >
            <span className="emoji">🏠</span> Home
          </NavLink>

          <NavLink
            to="/all"
            onClick={() => setIsMenuOpen(false)}
            style={({ isActive }) => ({
              padding: "15px 20px",
              borderRadius: "12px",
              fontSize: "1.1rem",
              fontWeight: "600",
              fontFamily: "'Inter', sans-serif",
              background: isActive
                ? "linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(139, 92, 246, 0.3))"
                : "rgba(255, 255, 255, 0.05)",
              border: isActive
                ? "2px solid rgba(236, 72, 153, 0.8)"
                : "2px solid rgba(255, 255, 255, 0.1)",
              color: "white",
              textDecoration: "none",
              display: "block",
              textAlign: "center"
            })}
          >
            <span className="emoji">🎞️</span> All Movies
          </NavLink>

          <NavLink
            to="/favorites"
            onClick={() => setIsMenuOpen(false)}
            style={({ isActive }) => ({
              padding: "15px 20px",
              borderRadius: "12px",
              fontSize: "1.1rem",
              fontWeight: "600",
              fontFamily: "'Inter', sans-serif",
              background: isActive
                ? "linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(139, 92, 246, 0.3))"
                : "rgba(255, 255, 255, 0.05)",
              border: isActive
                ? "2px solid rgba(236, 72, 153, 0.8)"
                : "2px solid rgba(255, 255, 255, 0.1)",
              color: "white",
              textDecoration: "none",
              display: "block",
              textAlign: "center"
            })}
          >
            <span className="emoji">❤️</span> Favorites
          </NavLink>
        </div>
      )}
    </>
  );
}