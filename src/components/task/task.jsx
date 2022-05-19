import React from 'react'


function Task({id, label, distance, status, changeStatus, deleteTask, editClick}) {

  const toggleCheck = (checked) => {
    changeStatus(checked ? 'completed' : 'active', id);
  }

  return (
    <div className="view">
        <input className= "toggle" checked= {status === 'completed'} type="checkbox" onChange= {(e) => {
          toggleCheck(e.target.checked);
        }}/>
        <label>
          <span className="description">{label}</span>
          <span className="created">{distance}</span>
        </label>
        <button className="icon icon-edit" onClick={() => {
          editClick(label, id, status);
        }}></button>
        <button className="icon icon-destroy" onClick={() => {deleteTask(id)}}></button>
    </div>
  )
}

/*
export default class Task extends React.Component {
  constructor(){
    super();
  }

  toggleCheck = (status) => {

  }

  render(){
    const {label, distance} = this.props;

    return (
      <div className="view">
          <input className="toggle" type="checkbox" onChange={(e) => {
            toggleCheck(e.target.checked);
          }}/>
          <label>
            <span className="description">{label}</span>
            <span className="created">{distance}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"></button>
      </div>
    )
  }
}
*/
export default Task;