import React from 'react'
import Task from '../task/'
import './task-list.css'

function TaskList({tasks, changeStatus, deleteTask}) {
  return (
    <ul className="todo-list">
      {tasks.map(task => (
        <li key={task.id} className= {task.status}>
          <Task id= {task.id} label= {task.description} distance= {task.createdDistance} changeStatus= {changeStatus} deleteTask= {deleteTask}/>
          <input type="text" className= {task.status === 'editing' ? 'edit' : 'hidden'} value="Editing task"/>
        </li>
      ))}
    </ul>
  )
}

export default TaskList