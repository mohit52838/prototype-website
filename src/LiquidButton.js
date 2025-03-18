import React, { useRef, useEffect } from "react";
import "./LiquidButton.css"; // Ensure this path is correct

const LiquidButton = ({ text, onClick, color1, color2, color3, textColor }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left; // Cursor X position relative to the button
      const y = e.clientY - rect.top; // Cursor Y position relative to the button

      // Update CSS variables for liquid effect
      button.style.setProperty("--x", `${x}px`);
      button.style.setProperty("--y", `${y}px`);
    };

    const handleMouseEnter = () => {
      button.style.setProperty("--liquid-opacity", "0.8"); // Increase liquid opacity on hover
    };

    const handleMouseLeave = () => {
      button.style.setProperty("--liquid-opacity", "0.5"); // Reset liquid opacity on leave
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className="liquid-button"
      onClick={onClick}
      style={{
        "--color1": color1,
        "--color2": color2,
        "--color3": color3,
        "--text-color": textColor,
      }}
    >
      <span className="liquid-button-text">{text}</span>
      <div className="liquid"></div>
    </button>
  );
};

export default LiquidButton;