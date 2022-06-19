import React, { useState, useEffect } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import PropTypes from "prop-types";

function Task({
  id,
  label,
  status,
  changeStatus,
  deleteTask,
  distance,
  editClick,
  stopTimer,
  startTimer,
  timerMin,
  timerSec,
}) {
  const [formatDistance, setFormatDistance] = useState("");
  const [createdIntervalId, setCreatedIntervalId] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFormatDistance(
        formatDistanceToNow(new Date(distance), {
          includeSeconds: true,
          addSuffix: true,
        })
      );
      setCreatedIntervalId(intervalId);
    }, 1000);
    return () => {
      if (createdIntervalId) {
        clearInterval(createdIntervalId);
        setCreatedIntervalId(null);
      }
    };
  }, []);

  const toggleCheck = (checked) => {
    changeStatus(checked ? "completed" : "active", id);
    if (checked) {
      stopTimer(id);
    }
  };

  return (
    <div className="view">
      <input
        className="toggle"
        checked={status === "completed"}
        type="checkbox"
        onChange={(e) => {
          toggleCheck(e.target.checked);
        }}
      />

      <label>
        <span className="title">{label}</span>
        <span className="description">
          <button
            className="icon icon-play"
            onClick={() => {
              startTimer(id);
            }}
          ></button>
          <button
            className="icon icon-pause"
            onClick={() => {
              stopTimer(id);
            }}
          ></button>
          &nbsp;&nbsp;{`${timerMin}:${timerSec}`}
        </span>
        <span className="description">{formatDistance}</span>
      </label>
      <button
        className="icon icon-edit"
        onClick={() => {
          editClick(label, id, status);
        }}
      ></button>
      <button
        className="icon icon-destroy"
        onClick={() => {
          deleteTask(id);
        }}
      ></button>
    </div>
  );
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["completed", "active", "editing"]).isRequired,
  changeStatus: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  distance: PropTypes.string.isRequired,
  editClick: PropTypes.func.isRequired,
  timerMin: PropTypes.string.isRequired,
  timerSec: PropTypes.string.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
};

Task.defaultProps = {
  changeStatus: () => {},
  deleteTask: () => {},
  editClick: () => {},
  startTimer: () => {},
  stopTimer: () => {},
};

export default Task;
