import React from 'react'
import './tasks-filter.css'

function TasksFilter() {
  return (
    <ul className="filters">
        <li>
          <button className="selected">All</button>
        </li>
        <li>
          <button>Active</button>
        </li>
        <li>
          <button>Completed</button>
        </li>
    </ul>
  )
}

export default TasksFilter