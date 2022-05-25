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
    };
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

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTask({
      description: this.state.label,
      status: "active",
      createdDistance: new Date(),
      id: this.state.maxId,
    });
    this.setState({
      maxId: this.state.maxId + 1,
      label: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.label}
          autoFocus
          onChange={this.onLabelChange}
        />
      </form>
    );
  }
}
