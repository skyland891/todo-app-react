import React from "react";
import PropTypes from "prop-types";
import TasksFilter from "../tasks-filter";
import "./footer.css";

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
  changeActiveFilterName: () => {},
  activeFilterName: "all",
};

Footer.propTypes = {
  clearCompleted: PropTypes.func.isRequired,
  completedTasksCount: PropTypes.number.isRequired,
  changeActiveFilterName: PropTypes.func.isRequired,
  activeFilterName: PropTypes.oneOf(["all", "active", "completed"]).isRequired,
};

export default Footer;
