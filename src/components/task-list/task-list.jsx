import React from 'react'
import Task from '../task/'
import './task-list.css'

const tasks = [
  {
    description: 'Completed task',
    status: 'completed',
    createdDistance: 'created 17 seconds ago',
    id: 1,
  },
  {
    description: 'Editing task',
    status: 'editing',
    createdDistance: 'created 5 minutes ago',
    id: 2,
  },
  {
    description: 'Active task',
    status: 'active',
    createdDistance: 'created 5 minutes ago',
    id: 3,
  }
];

function TaskList() {
  return (
    <ul className="todo-list">
      {tasks.map(task => (
        <li key={task.id} className= {task.status}>
          <Task label= {task.description} distance= {task.createdDistance}/>
          <input type="text" className= {task.status === 'editing' ? 'edit' : 'hidden'} value="Editing task"/>
        </li>
      ))}
    </ul>
  )
}

export default TaskList