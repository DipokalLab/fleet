import React, { useState, useEffect } from "react";
import { css, keyframes } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { Button } from "deventds2";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const blurBackground = {
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
};

const navbarContainerStyle = css({
  ...blurBackground,
  position: "fixed",
  top: 0,
  width: "100%",
  height: 52,
  display: "flex",
  alignItems: "center",
  zIndex: 1000,
  padding: "0 24px",
  boxSizing: "border-box",
  justifyContent: "space-between",
  "@media (min-width: 768px)": {
    justifyContent: "center",
  },
});

const logoStyle = css({
  fontSize: "16px",
  fontWeight: 700,
  color: "#000",
  flexShrink: 0,
  cursor: "pointer",
  "@media (min-width: 768px)": {
    position: "absolute",
    left: 24,
  },
});

const menuListStyle = css({
  display: "none",
  listStyle: "none",
  gap: "24px",
  margin: 0,
  padding: 0,
  height: "100%",
  alignItems: "center",
  "@media (min-width: 768px)": {
    display: "flex",
  },
});

const menuItemStyle = css({
  cursor: "pointer",
  fontSize: "1rem",
  color: "#000",
  transition: "color 0.2s ease",
  ":hover": {
    color: "#555",
  },
});

const hamburgerButtonStyle = css({
  width: 24,
  height: 24,
  position: "relative",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "@media (min-width: 768px)": {
    display: "none",
  },
});

const fadeIn = keyframes`
  from {
    opacity: 0; transform: scale(0.95);
  }
  to {
    opacity: 1; transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1; transform: scale(1);
  }
  to {
    opacity: 0; transform: scale(0.95);
  }
`;

const fullScreenMenuStyle = (isFadingIn: boolean) =>
  css({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    ...blurBackground,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    animation: `${isFadingIn ? fadeIn : fadeOut} 0.3s forwards`,
    ul: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      textAlign: "center",
    },
    li: {
      margin: "16px 0",
      fontSize: "1.5rem",
      fontWeight: 500,
      cursor: "pointer",
      color: "#000",
      ":hover": {
        color: "#555",
      },
    },
  });

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const { isLogin } = useAuth();

  useEffect(() => {
    if (menuOpen) {
      setMenuVisible(true);
    } else if (!menuOpen && menuVisible) {
      const timeout = setTimeout(() => {
        setMenuVisible(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [menuOpen, menuVisible]);

  const handleHamburgerClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav css={navbarContainerStyle}>
        <div css={logoStyle} onClick={() => navigate("/")}>
          fleet
        </div>
        <ul css={menuListStyle}>
          <li css={menuItemStyle}>Features</li>
          <li css={menuItemStyle}>Pricing</li>
          <li css={menuItemStyle}>Contact</li>
        </ul>
        <div
          css={css({
            display: "none",
            "@media (min-width: 768px)": {
              display: "block",
              position: "absolute",
              right: 24,
            },
          })}
        >
          {!isLogin() ? (
            <Button size="sm" color="blue" onClick={() => navigate("/auth")}>
              Get Started
            </Button>
          ) : (
            <Button
              size="sm"
              color="light"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
          )}
        </div>
        <div css={hamburgerButtonStyle} onClick={handleHamburgerClick}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </div>
      </nav>

      {menuVisible && (
        <div css={fullScreenMenuStyle(menuOpen)}>
          <ul>
            <li onClick={() => setMenuOpen(false)}>Features</li>
            <li onClick={() => setMenuOpen(false)}>Pricing</li>
            <li onClick={() => setMenuOpen(false)}>Contact</li>
          </ul>
          {!isLogin() ? (
            <Button size="sm" color="blue" onClick={() => navigate("/auth")}>
              Get Started
            </Button>
          ) : (
            <Button
              size="sm"
              color="black"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
          )}
        </div>
      )}
    </>
  );
}
