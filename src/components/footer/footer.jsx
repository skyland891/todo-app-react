import React from "react";
import TasksFilter from "../tasks-filter/";
import "./footer.css";
import PropTypes from "prop-types";

function Footer({
  clearCompleted,
  completedTasksCount,
  changeActiveFilterName,
  activeFilterName,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">{completedTasksCount} items left</span>
      <TasksFilter
        changeActiveFilterName={changeActiveFilterName}
        activeFilterName={activeFilterName}
      />
      <button
        className="clear-completed"
        onClick={() => {
          clearCompleted();
        }}
      >
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  clearCompleted: () => {},
  completedTasksCount: 0,
};

Footer.propTypes = {
  clearCompleted: PropTypes.func.isRequired,
  completedTasksCount: PropTypes.number.isRequired,
};

export default Footer;
