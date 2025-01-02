import React from "react";
import "./index.css";

const CustomInput = ({ placeholder, value, onChange, type, min, max }) => {
  return (
    <input
      className="custom-input"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      max={max}
      
    />
  );
};

export default CustomInput;
