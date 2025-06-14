import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import CompletedHome from "./assets/Components/Completed Tasks/CompletedHome";
import EditCompletedTask from "./assets/Components/Completed Tasks/EditCompletedTask";

function App() {
  const [count, setCount] = useState(0);

  //Simulate we have data stored in the Local Storage
  const storageObj = [
    { id: 1, Date: "2025-10-11", Title: "This is a trial Object" },
    { id: 2, Date: "2025-10-12", Title: "Second Object Example" },
    { id: 3, Date: "2025-10-13", Title: "Third Example Object" },
    { id: 4, Date: "2025-10-14", Title: "Fourth Trial Object" },
    { id: 5, Date: "2025-10-15", Title: "Fifth Example Object" },
    { id: 6, Date: "2025-10-16", Title: "Sixth Object for Testing" },
    { id: 7, Date: "2025-10-17", Title: "Seventh Sample Object" },
    { id: 8, Date: "2025-10-18", Title: "Eighth Object Trial" },
    { id: 9, Date: "2025-10-19", Title: "Ninth Object Example" },
    { id: 10, Date: "2025-10-20", Title: "Tenth Object Example" },
  ];
  localStorage.setItem("username", JSON.stringify(storageObj));
  

  const sampleData = [
    {
      id: 1,
      Date: "2025-10-11",
      Title: "Project Deadline",
      Description: `Finalize the React project and submit the documentation. 
      Ensure all components are optimized and bugs are resolved.`,
      Label: ["Work", { education: "Education", home: "Home", personal:"Personal", other: "Other" }],
      Reminder: [30, { 15: "15", 45: "45", 60:"60", 10:"10" }],
    },
    {
      id: 2,
      Date: "2025-08-15",
      Title: "Weekend Getaway",
      Description: `Plan a road trip to Naivasha with friends. 
      Pack essentials, confirm reservations, and set up the itinerary.`,
      Label: ["Personal", { education: "Education", work:"Work", home: "Home", other: "Other" }],
      Reminder: [10, { 15: "15", 45: "45", 60:"60", 30:"30" }],
    },
    {
      id: 3,
      Date: "2025-07-20",
      Title: "Coding Workshop",
      Description: `Prepare a presentation on advanced React patterns. 
      Include practical examples and interactive exercises for attendees.`,
      Label: ["Education", { personal:"Personal", home: "Home", other: "Other", work:"Work"}],
      Reminder: [60, { 15: "15", 45: "45", 30:"30", 10:"10" }],
    },
    {
      id: 4,
      Date: "2025-12-01",
      Title: "Health Checkup",
      Description: `Schedule an annual medical checkup. 
      Ensure all necessary tests are completed for a comprehensive report.`,
      Label: ["Other", { personal:"Personal", home: "Home", education: "Education", work:"Work"}],
      Reminder: [45, { 15: "15", 30: "30", 60:"60", 10:"10" }],
    },
  ];

  localStorage.setItem("completed", JSON.stringify(sampleData));

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <EditCompletedTask />
    </>
  );
}

export default App;
