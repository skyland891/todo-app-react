import React from 'react'
import './tasks-filter.css'

function TasksFilter({changeActiveFilterName, activeFilterName}) {
  return (
    <ul className="filters">
        <li>
          <button className= {activeFilterName === 'all' ? "selected" : null} onClick= {() => {
            changeActiveFilterName('all');
          }}>All</button>
        </li>
        <li>
          <button className= {activeFilterName === 'active' ? "selected" : null} onClick= {() => {
            changeActiveFilterName('active');
          }}>Active</button>
        </li>
        <li>
          <button className= {activeFilterName === 'completed' ? "selected" : null} onClick= {() => {
            changeActiveFilterName('completed');
          }}>Completed</button>
        </li>
    </ul>
  )
}

export default TasksFilter;