import React, { useState } from "react";
import "./App.css";
import AgeCalculate from "./AgeCalculate";

const App = () => {
  const [age, setAge] = useState(null);
  const [error, setError] = useState("");

  const calculateAge = (day, month, year) => {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);

    if (birthDate > today) {
      setError("The date cannot be in the future.");
      setAge(null);
      return;
    }

    const currentYear = today.getFullYear();
    let calculatedAge = currentYear - year;

    if (
      today.getMonth() < month - 1 ||
      (today.getMonth() === month - 1 && today.getDate() < day)
    ) {
      calculatedAge--;
    }

    setError("");
    setAge(calculatedAge);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const day = parseInt(e.target.day.value);
    const month = parseInt(e.target.month.value);
    const year = parseInt(e.target.year.value);

    if (!day || !month || !year) {
      setError("Please enter a valid date.");
      setAge(null);
      return;
    }

    calculateAge(day, month, year);
  };

  return (
    <div className="app">
  {/*    */}
  <AgeCalculate/>
    </div>
  );
};

export default App;
