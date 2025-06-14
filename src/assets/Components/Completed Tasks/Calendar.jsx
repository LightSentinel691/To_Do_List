import React, { useState, useEffect } from "react";
import "./CompletedTasksStyles.css"; // Ensure styles are applied


const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState("");
  
  useEffect(() => {
    setSelectedDate("2025-08-15"); // Default selected date
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };


  return (
    <div>
      <input 
        type="date" 
        onChange={handleDateChange} 
        value={selectedDate}  
        min={selectedDate} // Disable dates before selected one
        className="calendar-input"
      />
    </div>
  ); 
};

export default Calendar;


//Pass the Correct Date to Display the event