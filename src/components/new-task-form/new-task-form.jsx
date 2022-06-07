import React from "react";
import "./new-task-form.css";
import PropTypes from "prop-types";
/*
function NewTaskForm() {
  return (
    <input className="new-todo" placeholder="What needs to be done?" autoFocus/>
  )
}
*/
export default class NewTaskForm extends React.Component {
  constructor() {
    super();
    this.state = {
      label: "",
      maxId: 100,
      timerMin: "",
      timerSec: "",
    };
  }

  componentDidMount() {
    this.setState({
      maxId: localStorage.maxId ? JSON.parse(localStorage.maxId) : 100,
    });
  }

  static defaultProps = {
    addTask: () => {},
  };

  static propTypes = {
    addTask: PropTypes.func.isRequired,
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onTimerMinChange = (e) => {
    this.setState({
      timerMin: e.target.value,
    });
  };

  onTimerSecChange = (e) => {
    this.setState({
      timerSec: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const emptyLabel = this.state.label.trim() === "";
    const secIsNaN = Number.isNaN(parseInt(this.state.timerSec, 10));
    const minIsNaN = Number.isNaN(parseInt(this.state.timerMin, 10));
    const wrongSecInterval =
      parseInt(this.state.timerSec, 10) >= 60 ||
      parseInt(this.state.timerSec, 10) < 0;
    if (emptyLabel || secIsNaN || minIsNaN || wrongSecInterval) {
      return;
    }
    this.props.addTask({
      description: this.state.label,
      initialTimer: [this.state.timerMin, this.state.timerSec],
      timerMin: this.state.timerMin,
      timerSec:
        this.state.timerSec.length === 1
          ? `0${this.state.timerSec}`
          : this.state.timerSec,
      status: "active",
      createdDistance: new Date(),
      id: this.state.maxId,
    });
    this.setState({
      maxId: this.state.maxId + 1,
      label: "",
      timerMin: "",
      timerSec: "",
    });
    localStorage.maxId = JSON.stringify(this.state.maxId + 1);
  };

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.label}
          autoFocus
          onChange={this.onLabelChange}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          value={this.state.timerMin}
          onChange={this.onTimerMinChange}
        ></input>
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          value={this.state.timerSec}
          onChange={this.onTimerSecChange}
        ></input>
        <button className="hidden" type="submit"></button>
      </form>
    );
  }
}
