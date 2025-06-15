import React, { useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from "./Calendar";

function EditCompletedTask() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};

  const reducerListEdit = (state, action) => {
    switch (action.type) {
      case "DISPLAY_DETAILS":
        return action.payload;
      case "Edit_Title":
        //we pick the section user is editing, payload should be an object, with place being edited and The new text after editing
        return action.payload;
    }
  };

  //Load the Data from the LocaLStorage and update it into our
  const [TaskEdit, dispatchTaskEdit] = useReducer(reducerListEdit, []);

  useEffect(() => {
    const completedObjects = JSON.parse(localStorage.getItem("completed"));
    const particularObject = completedObjects.find((entry) => entry.id === id);
    dispatchTaskEdit({
      type: "DISPLAY_DETAILS",
      payload: particularObject,
    });
  }, []);

  const handleDelete = (id) => {
    const completedTasksArr = JSON.parse(localStorage.getItem("completed"));
    const newArr = completedTasksArr.filter((event) => id !== event.id);
    localStorage.setItem("completed", JSON.stringify(newArr));
    navigate("/")
  };
  

  return (
    <div>
      <EditDeTailsContent info={TaskEdit} handleDelete={handleDelete} />
    </div>
  );
}

export default EditCompletedTask;

const EditDeTailsContent = ({ info, handleDelete }) => {
  const { Label, Reminder } = info;
  return (
    <div>
      <div className="flex justify-center">
        <p className="w-4/5 bg-orange-200 rounded-lg text-4xl font-semibold text-center p-2 m-2 pt-4 pb-4">{info.Title}</p>
      </div>
      <div className="flex justify-center h-96 mb-2 ">
        <p className="w-4/5 bg-gray-200 text-xl pt-4 pl-4 pr-4 rounded-3xl">{info.Description}</p>
      </div>
      <div className="flex justify-center">
        <div className="flex text-xl w-4/5 pt-3 pb-3">
          <div className="w-1/3">
            <Calendar date={info.Date} />
          </div>
          <div className="w-1/3">
            <label htmlFor="label">Label: </label>
            <select name="label">
              <option value={Label?.[0]}>{Label?.[0]}</option>
              {Object.keys(Label?.[1] || {}).map((key) => {
                return (
                  <option key={key} value={key}>
                    {Label?.[1]?.[key]}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-1/3">
            <label htmlFor="reminder">Reminders:</label>
            <select name="reminder">
              <option value={Reminder?.[0]}>{Reminder?.[0]} Mins</option>
              {/* {Check which are the other options to use } */}
              {Object.keys(Reminder?.[1] || {}).map((key) => {
                return (
                  <option key={key} value={key}>
                    {Reminder?.[1]?.[key]} Mins
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div>
        <div className="text-center mt-2">
          <button className="bg-red-400 hover:bg-green-400 p-3 rounded-lg text-xl"
            onClick={() => {
              handleDelete(info.id);
            }}
          >
            Delete Event
          </button>
        </div>
      </div>
    </div>
  );
};

//ToDo:
//Use useReducer to update state as might be under any many sections
//Function to handle any changed section
//On Changing the date to a future date, change it to an active to do item
// Add a update button to update the info





//Format for storing the Label and Reminders
// {Label: [work, {education: Education, home:Home, other: Other}]}

