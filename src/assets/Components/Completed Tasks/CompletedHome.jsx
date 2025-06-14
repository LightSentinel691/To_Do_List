import React, { useEffect, useReducer, useState } from "react";

function CompletedHome() {
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
    JSON.parse(localStorage.getItem("username") || null)
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const completedDetailsObj = Tasks;
    if (completedDetailsObj) {
      setIsLoading(true);
      dispatchTasks({
        type: "SET_DATA",
        payload: completedDetailsObj,
      });
      setIsLoading(false);
    } else {
      dispatchTasks({
        type: "NO_DATA",
        payload: completedDetailsObj,
      });
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("username", JSON.stringify(Tasks));
  }, [Tasks]);

  const handleDelete = (item) => {
    //display the modal window to ask someone whether they are sure they want to delete the entry
    dispatchTasks({
      type: "REMOVE_TASK",
      payload: item.id,
    });
  };

  return (
    <>
      <div>
        {Tasks === null ? (
          <p>You don't have any completed Tasks Yet</p>
        ) : (
          <List data={Tasks} handleDelete={handleDelete} />
        )}
      </div>
    </>
  );
}

export default CompletedHome;

const List = ({ data, handleDelete }) => {
  return (
    <ul>
      {data.map((entry) => {
        return (
          <ListEntries
            key={entry.id}
            data={entry}
            handleDelete={handleDelete}
          />
        );
      })}
    </ul>
  );
};

const ListEntries = ({ data, handleDelete }) => (
  <li>
    <span>{data.Date}</span>&nbsp;&nbsp;
    <span>{data.Title}</span> &nbsp;&nbsp;
    <span>
      <button>Edit</button>
    </span>
    &nbsp; &nbsp;
    <span>
      <button onClick={() => handleDelete(data)}>Delete</button>
    </span>
  </li>
);


//TODO : 
//Implement redirection on Clicking Edit Button
// Work on the UI section now
//Strike Through for the Date and Title Attribute
