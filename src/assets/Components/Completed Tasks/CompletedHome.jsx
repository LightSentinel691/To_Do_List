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
    navigate("./Edit", { state: { id: idValue } });
  };

  return (
    <>
      <div>
        <h1 className="text-4xl font-bold mb-5 mt-3 text-center">
          Completed Tasks
        </h1>
        {Tasks === null ? (
          <p>You don't have any completed Tasks Yet</p>
        ) : (
          <List
            data={Tasks}
            handleDelete={handleDelete}
            handleRedirect={handleRedirect}
          />
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
            handleRedirect={handleRedirect}
          />
        );
      })}
    </ul>
  );
};

const ListEntries = ({ data, handleDelete, handleRedirect }) => (
  <li
    className="flex bg-orange-200 ml-3 mr-3 mt-2 p-1 text-center items-center hover:bg-orange-300 hover:shadow-lg hover:shadow-orange-500/50 rounded-2xl"
    onClick={() => handleRedirect(data.id)}
  >
    <span className="p-2 w-1/5 line-through">{data.Date}</span>&nbsp;&nbsp;
    <span className="w-3/5 text-lg p-3 line-through">{data.Title}</span>{" "}
    &nbsp;&nbsp;
    <span className="w-1/5 text-white">
      <button
        onClick={() => handleRedirect(data.id)}
        className=" bg-red-400 w-full p-3 rounded-lg  hover:bg-green-400"
      >
        Edit
      </button>
    </span>
    &nbsp; &nbsp;
    <span className="w-1/5 text-white">
      <button
        onClick={() => handleDelete(data)}
        className=" bg-red-400 w-full p-3 rounded-lg  hover:bg-green-400"
      >
        Delete
      </button>
    </span>
  </li>
);

