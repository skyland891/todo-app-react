import React, { useState, useEffect } from "react";
import "./new-task-form.css";
import PropTypes from "prop-types";

function NewTaskForm({ addTask }) {
  const [label, setLabel] = useState("");
  const [maxId, setMaxId] = useState(100);
  const [timerMin, setTimerMin] = useState("");
  const [timerSec, setTimerSec] = useState("");

  useEffect(() => {
    setMaxId(localStorage.maxId ? JSON.parse(localStorage.maxId) : 100);
  }, []);

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onTimerMinChange = (e) => {
    setTimerMin(e.target.value);
  };

  const onTimerSecChange = (e) => {
    setTimerSec(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const emptyLabel = label.trim() === "";
    const secIsNaN = Number.isNaN(parseInt(timerSec, 10));
    const minIsNaN = Number.isNaN(parseInt(timerMin, 10));
    const wrongSecInterval =
      parseInt(timerSec, 10) >= 60 || parseInt(timerSec, 10) < 0;
    if (emptyLabel || secIsNaN || minIsNaN || wrongSecInterval) {
      return;
    }
    addTask({
      description: label,
      initialTimer: [timerMin, timerSec],
      timerMin: timerMin,
      timerSec: timerSec.length === 1 ? `0${timerSec}` : timerSec,
      status: "active",
      createdDistance: new Date(),
      id: maxId,
    });
    setTimerMin("");
    setTimerSec("");
    setLabel("");
    setMaxId((prevMaxId) => prevMaxId + 1);
    localStorage.maxId = JSON.stringify(maxId + 1);
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={label}
        autoFocus
        onChange={onLabelChange}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        autoFocus
        value={timerMin}
        onChange={onTimerMinChange}
      ></input>
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        autoFocus
        value={timerSec}
        onChange={onTimerSecChange}
      ></input>
      <button className="hidden" type="submit"></button>
    </form>
  );
}

NewTaskForm.defaultProps = {
  addTask: () => {},
};

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
