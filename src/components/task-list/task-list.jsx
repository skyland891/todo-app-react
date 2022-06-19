import React, { useState } from "react";
import PropTypes from "prop-types";
import Task from "../task";
import "./task-list.css";

function TaskList({
  tasks,
  editDescription,
  changeStatus,
  startTimer,
  stopTimer,
  deleteTask,
}) {
  const [inputValue, setInputValue] = useState("");
  const [inputId, setInputId] = useState(null);
  const [prevStatus, setPrevStatus] = useState(null);

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editDescription(inputValue, inputId, prevStatus);
    setInputValue("");
    setInputId(null);
    setPrevStatus(null);
  };

  const editClick = (taskName, id, status) => {
    if (inputId) {
      editDescription(inputValue, inputId, prevStatus);
    }
    setInputValue(taskName);
    setInputId(id);
    setPrevStatus(status);
    changeStatus("editing", id);
  };

  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.status}>
          <Task
            id={task.id}
            label={task.description}
            timerMin={task.timerMin}
            timerSec={task.timerSec}
            distance={task.createdDistance}
            status={task.status}
            changeStatus={changeStatus}
            deleteTask={deleteTask}
            editClick={editClick}
            startTimer={startTimer}
            stopTimer={stopTimer}
          />

          <form onSubmit={onSubmit}>
            <input
              type="text"
              className={task.status === "editing" ? "edit" : "hidden"}
              placeholder="Editing task"
              value={inputValue}
              onChange={onChange}
            />
          </form>
        </li>
      ))}
    </ul>
  );
}

TaskList.defaultProps = {
  startTimer: () => {},
  stopTimer: () => {},
  editDescription: () => {},
  changeStatus: () => {},
  deleteTask: () => {},
  tasks: [],
};

TaskList.propTypes = {
  editDescription: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object),
};

export default TaskList;
