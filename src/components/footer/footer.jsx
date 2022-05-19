import React from 'react'
import TasksFilter from '../tasks-filter/'
import './footer.css'

function Footer({clearCompleted, completedTasksCount, changeActiveFilterName, activeFilterName}) {
  return (
    <footer className="footer">
          <span className="todo-count">{completedTasksCount} items left</span>
          <TasksFilter changeActiveFilterName= {changeActiveFilterName} activeFilterName= {activeFilterName}/>
          <button className="clear-completed" onClick={() => {
            clearCompleted();
          }}>Clear completed</button>
        </footer>
  )
}

export default Footer