import React from 'react'
import './tasks-filter.css'
import PropTypes from 'prop-types';

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

TasksFilter.defaultProps = {
  changeActiveFilterName: () => {},
  activeFilterName: 'all',
}

TasksFilter.propTypes = {
  changeActiveFilterName: PropTypes.func.isRequired,
  activeFilterName: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
}

export default TasksFilter;