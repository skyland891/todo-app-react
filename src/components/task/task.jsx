import React from 'react'

function Task({label, distance}) {
  return (
    <div className="view">
        <input className="toggle" type="checkbox"/>
        <label>
          <span className="description">{label}</span>
          <span className="created">{distance}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
    </div>
  )
}

export default Task