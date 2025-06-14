import React, { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";


function CompletedHome() {
    const navigate = useNavigate();

  const reducerList = (state, action) => {
    switch (action.type) {
      case "SET_DATA":
        return action.payload;
      case "REMOVE_TASK":
        return state.filter((entry) => action.payload !== entry.id);
      case "NO_DATA":
        return action.payload;
    }
  };

  //update state to load the deleted item
  const [Tasks, dispatchTasks] = useReducer(
    reducerList,
    JSON.parse(localStorage.getItem("completed") || null)
  );

  useEffect(() => {
    const completedDetailsObj = Tasks;
    if (completedDetailsObj) {
      dispatchTasks({
        type: "SET_DATA",
        payload: completedDetailsObj,
      });
    } else {
      dispatchTasks({
        type: "NO_DATA",
        payload: completedDetailsObj,
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("completed", JSON.stringify(Tasks));
  }, [Tasks]);

  const handleDelete = (item) => {
    //display the modal window to ask someone whether they are sure they want to delete the entry
    dispatchTasks({
      type: "REMOVE_TASK",
      payload: item.id,
    });
  };

  const handleRedirect = (idValue) => {
    navigate("./Edit", {state: {id: idValue}})
  }

  return (
    <>
      <div>
        {Tasks === null ? (
          <p>You don't have any completed Tasks Yet</p>
        ) : (
          <List data={Tasks} handleDelete={handleDelete} handleRedirect={handleRedirect}/>
        )}
      </div>
    </>
  );
}

export default CompletedHome;

const List = ({ data, handleDelete, handleRedirect }) => {
  return (
    <ul>
      {data.map((entry) => {
        return (
          <ListEntries
            key={entry.id}
            data={entry}
            handleDelete={handleDelete}
            handleRedirect = {handleRedirect}
          />
        );
      })}
    </ul>
  );
};

const ListEntries = ({ data, handleDelete, handleRedirect }) => (
  <li>
    <span>{data.Date}</span>&nbsp;&nbsp;
    <span>{data.Title}</span> &nbsp;&nbsp;
    <span>
      <button onClick={()=>handleRedirect(data.id)}>Edit</button>
    </span>
    &nbsp; &nbsp;
    <span>
      <button onClick={() => handleDelete(data)}>Delete</button>
    </span>
  </li>
);


//TODO :
// Work on the UI section now
//Strike Through for the Date and Title Attribute
