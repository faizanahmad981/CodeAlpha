import React from "react";
import "./index.css";

const CustomButton = ({ label, onClick }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default CustomButton;
