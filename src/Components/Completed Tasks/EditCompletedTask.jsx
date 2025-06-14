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
      <div>
        <p>{info.Title}</p>
      </div>
      <div>
        <p>{info.Description}</p>
      </div>
      <div>
        <div>
          <div>
            console.log(info);
            <Calendar date={info.Date} />
          </div>
          <div>
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
          <div>
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
        <div>
          <button
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




//Format for storing the Label and Reminders
// {Label: [work, {education: Education, home:Home, other: Other}]}

