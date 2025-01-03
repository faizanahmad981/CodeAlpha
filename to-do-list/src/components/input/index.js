import React from 'react'

const CustomInput = ({ placeholder, value, onChange, type,className}) => {
  return (
    <input
      className={className}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
     
      
    />
  );
};

export default CustomInput;

