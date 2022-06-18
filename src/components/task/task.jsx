import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import PropTypes from "prop-types";
/*
function Task({id, label, distance, status, changeStatus, deleteTask, editClick}) {

  const toggleCheck = (checked) => {
    changeStatus(checked ? 'completed' : 'active', id);
  }

  return (
    <div className="view">

        <input 
        className= "toggle" 
        checked= {status === 'completed'} 
        type="checkbox" 
        onChange= {(e) => {
          toggleCheck(e.target.checked);
        }}/>

        <label>
          <span className="description">{label}</span>
          <span className="created">{formatDistanceToNow(new Date(distance), {includeSeconds: true, addSuffix: true})}</span>
        </label>
        <button className="icon icon-edit" onClick={() => {
          editClick(label, id, status);
        }}></button>
        <button className="icon icon-destroy" onClick={() => {deleteTask(id)}}></button>
    </div>
  )
}
*/
class Task extends React.Component {
  constructor() {
    super();
    this.state = {
      distance: "",
      createdIntervalId: null,
    };
  }

  static defaultProps = {
    changeStatus: () => {},
    deleteTask: () => {},
    editClick: () => {},
    startTimer: () => {},
    stopTimer: () => {},
  };

  static propTypes = {
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["completed", "active", "editing"]).isRequired,
    changeStatus: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    editClick: PropTypes.func.isRequired,
    distance: PropTypes.string.isRequired,
    timerMin: PropTypes.string.isRequired,
    timerSec: PropTypes.string.isRequired,
    startTimer: PropTypes.func.isRequired,
    stopTimer: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const createdIntervalId = setInterval(() => {
      this.setState({
        distance: formatDistanceToNow(new Date(this.props.distance), {
          includeSeconds: true,
          addSuffix: true,
        }),
        createdIntervalId: createdIntervalId,
      });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.state.createdIntervalId) {
      clearInterval(this.state.createdIntervalId);
      this.setState({
        createdIntervalId: null,
      });
    }
  }

  render() {
    const {
      id,
      label,
      status,
      changeStatus,
      deleteTask,
      editClick,
      stopTimer,
      startTimer,
      timerMin,
      timerSec,
    } = this.props;

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
          <span className="description">{this.state.distance}</span>
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
}

export default Task;
