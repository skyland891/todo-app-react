import React from "react";
import PropTypes from "prop-types";
import Task from "../task";
import "./task-list.css";
/*
function TaskList({tasks, changeStatus, deleteTask}) {
  return (
    <ul className="todo-list">
      {tasks.map(task => (
        <li key={task.id} className= {task.status}>
          <Task id= {task.id} label= {task.description} distance= {task.createdDistance} status= {task.status} changeStatus= {changeStatus} deleteTask= {deleteTask}/>
          <input type="text" className= {task.status === 'editing' ? 'edit' : 'hidden'} value="Editing task"/>
        </li>
      ))}
    </ul>
  )
}
*/

class TaskList extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
      inputId: null,
      prevStatus: null,
    };
  }

  onChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { inputValue, inputId, prevStatus } = this.state;
    this.props.editDescription(inputValue, inputId, prevStatus);
    this.setState({
      inputValue: "",
      inputId: null,
      prevStatus: null,
    });
  };

  static defaultProps = {
    editDescription: () => { },
    changeStatus: () => { },
    deleteTask: () => { },
    editClick: () => { },
  };

  static propTypes = {
    editDescription: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["completed", "active", "editing"]).isRequired,
    changeStatus: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    editClick: PropTypes.func.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.object),
  };

  editClick = (taskName, id, status) => {
    if (this.state.inputId) {
      const { inputValue, inputId, prevStatus } = this.state;
      this.props.editDescription(inputValue, inputId, prevStatus);
    }
    console.log(taskName, id);
    this.setState({
      inputValue: taskName,
      inputId: id,
      prevStatus: status,
    });
    this.props.changeStatus("editing", id);
  };

  render() {
    const { tasks, changeStatus, deleteTask } = this.props;
    return (
      <ul className="todo-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.status}>
            <Task
              id={task.id}
              label={task.description}
              distance={task.createdDistance}
              status={task.status}
              changeStatus={changeStatus}
              deleteTask={deleteTask}
              editClick={this.editClick}
            />

            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                className={task.status === "editing" ? "edit" : "hidden"}
                placeholder="Editing task"
                value={this.state.inputValue}
                onChange={this.onChange}
              />
            </form>
          </li>
        ))}
      </ul>
    );
  }
}

export default TaskList;
