import React, { useState, useEffect } from "react"; 
import "./index.css";
import CustomButton from "../component/Button";
import CustomInput from "../component/inputField";

const AgeCalculate = () => {
  const [dob, setDob] = useState({ day: "", month: "", year: "" });
  const [currentDate, setCurrentDate] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [age, setAge] = useState(null);
  const [error, setError] = useState("");

  // Set current date on component mount
  useEffect(() => {
    const today = new Date();
    setCurrentDate({
      day: today.getDate(),
      month: today.getMonth() + 1,  
      year: today.getFullYear(),
    });
  }, []);
  const isValidDate=(day,month,year)=>{
      if(month<1 || month>12){
        return 'month must be between 1 and 12 '
      }
      if(year<1900){
        return 'year must be 1900 or greater than that'
      }
      const daysInMonth=new Date(year, month, 0).getDate();
      if(day<1 || day>daysInMonth){
        return `Day must be between 1 and ${daysInMonth} for the selected month.`
      }
      return null
  }
  const calculateExactAge = (dob, currentDate) => {
    const dobDate = new Date(dob.year, dob.month - 1, dob.day);
    const todayDate = new Date(currentDate.year, currentDate.month - 1, currentDate.day);

    if (dobDate > todayDate) {
      return { error: "Date of birth cannot be in the future.", result: null };
    }

    let years = todayDate.getFullYear() - dobDate.getFullYear();
    let months = todayDate.getMonth() - dobDate.getMonth();
    let days = todayDate.getDate() - dobDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(todayDate.getFullYear(), todayDate.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { error: null, result: { years, months, days } };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!dob.day || !dob.month || !dob.year) {
      setError("Please fill in all fields.");
      return;
    }
    const validationError = isValidDate(Number(dob.day), Number(dob.month), Number(dob.year));
    if (validationError) {
      setError(validationError);
      setAge(null);
      return;
    }
    const { error, result } = calculateExactAge(dob, currentDate);
    if (error) {
      setError(error);
      setAge(null);
    } else {
      setError("");
      setAge(result);
    }
  };

  return (
    <div className="marginLR">
      <div className="calculator-card">
        <h1>Age Calculator</h1>
        <form onSubmit={handleSubmit}>
          <h2>Date of Birth</h2>
          <div className="input-group">
            <CustomInput
              placeholder="Day"
              value={dob.day}
              onChange={(e) => setDob({ ...dob, day: e.target.value })}
              type="number"
              min="1"
              max="31"
            />
            <CustomInput
              placeholder="Month"
              value={dob.month}
              onChange={(e) => setDob({ ...dob, month: e.target.value })}
              type="number"
              min="1"
              max="12"
            />
            <CustomInput
              placeholder="Year"
              value={dob.year}
              onChange={(e) => setDob({ ...dob, year: e.target.value })}
              type="number"
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>

         

          <CustomButton label="Calculate Age" onClick={handleSubmit} />
        </form>
        {error && <p className="error">{error}</p>}
        {age && (
          <div className="result">
            <p>Your Exact Age:</p>
            <div className="result-grid">
              <div className="result-header">
                <span>Years</span>
                <span>Months</span>
                <span>Days</span>
              </div>
              <div className="result-values">
                <div className="circleStyle">{age.years}</div>
                <div className="circleStyle">{age.months}</div>
                <div className="circleStyle">{age.days}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeCalculate;
