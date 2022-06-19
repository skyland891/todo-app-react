import React, { useEffect, useState } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import TaskList from "./components/task-list";
import "./App.css";
/*
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        {
          description: "Completed task",
          initialTimer: ["12", "25"],
          timerMin: "12",
          timerSec: "25",
          timerId: null,
          status: "completed",
          createdDistance: new Date(),
          id: 1,
        },
        {
          description: "Active task",
          initialTimer: ["12", "25"],
          timerMin: "12",
          timerSec: "25",
          timerId: null,
          status: "active",
          createdDistance: new Date(),
          id: 3,
        },
      ],
      activeFilterName: "all",
    };
  }

  componentDidMount() {
    const tasks = localStorage.tasks ? JSON.parse(localStorage.tasks) : [];
    this.setState({
      tasks: tasks,
    });
  }

  componentDidUpdate() {
    localStorage.tasks = JSON.stringify(this.state.tasks);
  }

  filterTasks = () => {
    const tasks = JSON.parse(JSON.stringify(this.state.tasks));
    return tasks.filter((task) => {
      if (this.state.activeFilterName === "all") {
        return true;
      }
      return task.status === this.state.activeFilterName;
    });
  };

  changeActiveFilterName = (name) => {
    this.setState({
      activeFilterName: name,
    });
  };

  changeStatus = (status, id) => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.map((task) => {
        const newTask = { ...task };
        if (newTask.id === id) {
          newTask.status = status;
        }
        return newTask;
      });
      return { tasks: newTasks };
    });
  };

  deleteTask = (id) => {
    this.setState(({ tasks }) => {
      const newTasks = JSON.parse(JSON.stringify(tasks)).filter(
        (task) => task.id !== id
      );
      return { tasks: newTasks };
    });
  };

  activeCount = () => {
    return this.state.tasks.reduce((accum, task) => {
      return accum + (task.status === "active" ? 1 : 0);
    }, 0);
  };

  addTask = (task) => {
    this.setState(({ tasks }) => {
      const newTasks = [...JSON.parse(JSON.stringify(tasks)), task];
      return { tasks: newTasks };
    });
  };

  clearCompleted = () => {
    this.setState(({ tasks }) => {
      const newTasks = JSON.parse(JSON.stringify(tasks)).filter(
        (task) => task.status !== "completed"
      );
      return { tasks: newTasks };
    });
  };

  editDescription = (description, id, prevStatus) => {
    this.setState(({ tasks }) => {
      const newTask = JSON.parse(JSON.stringify(tasks)).map((task) =>
        task.id === id
          ? { ...task, description: description, status: prevStatus }
          : task
      );
      return { tasks: newTask };
    });
  };

  stopTimer = (id) => {
    const taskIndex = this.state.tasks.findIndex((task) => task.id === id);
    clearInterval(this.state.tasks[taskIndex].timerId);
    this.setState((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.tasks[taskIndex].timerId = null;
      return newState;
    });
  };

  updateTimer = (min, sec) => {
    const minNum = parseInt(min, 10);
    const secNum = parseInt(sec, 10);
    if (sec === "00") {
      if (min === "00") {
        return ["00", "00"];
      }
      const newMin =
        `${minNum - 1}`.length >= 2 ? `${minNum - 1}` : `0${minNum - 1}`;
      return [newMin, "59"];
    }
    const newSec =
      `${secNum - 1}`.length === 2 ? `${secNum - 1}` : `0${secNum - 1}`;
    return [min, newSec];
  };

  startTimer = (id) => {
    const taskIndex = this.state.tasks.findIndex((task) => task.id === id);
    if (
      this.state.tasks[taskIndex].timerId ||
      this.state.tasks[taskIndex].status === "completed"
    ) {
      return;
    }
    const timerId = setInterval(() => {
      this.setState((prevState) => {
        const newState = JSON.parse(JSON.stringify(prevState));
        const sec = newState.tasks[taskIndex].timerSec;
        const min = newState.tasks[taskIndex].timerMin;
        let [newMin, newSec] = this.updateTimer(min, sec);
        if (newMin === "00" && newSec === "00") {
          this.stopTimer(newState.tasks[taskIndex].id);
          [newMin, newSec] = newState.tasks[taskIndex].initialTimer;
        }
        newState.tasks[taskIndex].timerSec = newSec;
        newState.tasks[taskIndex].timerMin = newMin;
        return newState;
      });
    }, 1000);
    this.setState((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      newState.tasks[taskIndex].timerId = timerId;
      return newState;
    });
  };

  render() {
    return (
      <section className="todoapp">
        <Header addTask={this.addTask} />
        <section className="main">
          <TaskList
            tasks={this.filterTasks()}
            editDescription={this.editDescription}
            changeStatus={this.changeStatus}
            deleteTask={this.deleteTask}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
          />

          <Footer
            clearCompleted={this.clearCompleted}
            completedTasksCount={this.activeCount()}
            changeActiveFilterName={this.changeActiveFilterName}
            activeFilterName={this.state.activeFilterName}
          />
        </section>
      </section>
    );
  }
}
*/

function App() {
  const [taskList, setTaskList] = useState([]);
  const [activeFilterName, setActiveFilterName] = useState("all");
  const [mountedFlag, setMountedFlag] = useState(false);

  useEffect(() => {
    const tasks = localStorage.tasks ? JSON.parse(localStorage.tasks) : [];
    setTaskList(tasks);
    setMountedFlag(true);
  }, []);

  useEffect(() => {
    if (mountedFlag) {
      localStorage.tasks = JSON.stringify(taskList);
    }
  }, [taskList]);

  const filterTasks = () => {
    const tasks = JSON.parse(JSON.stringify(taskList));
    return tasks.filter((task) => {
      if (activeFilterName === "all") {
        return true;
      }
      return task.status === activeFilterName;
    });
  };

  const changeActiveFilterName = (name) => {
    setActiveFilterName(name);
  };

  const changeStatus = (status, id) => {
    setTaskList((tasks) => {
      const newTasks = tasks.map((task) => {
        const newTask = { ...task };
        if (newTask.id === id) {
          newTask.status = status;
        }
        return newTask;
      });
      return newTasks;
    });
  };

  const deleteTask = (id) => {
    setTaskList((tasks) => {
      const newTasks = JSON.parse(JSON.stringify(tasks)).filter(
        (task) => task.id !== id
      );
      return newTasks;
    });
  };

  const activeCount = () => {
    return taskList.reduce((accum, task) => {
      return accum + (task.status === "active" ? 1 : 0);
    }, 0);
  };

  const addTask = (task) => {
    setTaskList((tasks) => {
      const newTasks = [...JSON.parse(JSON.stringify(tasks)), task];
      return newTasks;
    });
  };

  const clearCompleted = () => {
    setTaskList((tasks) => {
      const newTasks = JSON.parse(JSON.stringify(tasks)).filter(
        (task) => task.status !== "completed"
      );
      return newTasks;
    });
  };

  const editDescription = (description, id, prevStatus) => {
    setTaskList((tasks) => {
      const newTasks = JSON.parse(JSON.stringify(tasks)).map((task) =>
        task.id === id
          ? { ...task, description: description, status: prevStatus }
          : task
      );
      return newTasks;
    });
  };

  const stopTimer = (id) => {
    const taskIndex = taskList.findIndex((task) => task.id === id);
    clearInterval(taskList[taskIndex].timerId);
    setTaskList((tasks) => {
      const newTasks = JSON.parse(JSON.stringify(tasks));
      newTasks[taskIndex].timerId = null;
      return newTasks;
    });
  };

  const updateTimer = (min, sec) => {
    const minNum = parseInt(min, 10);
    const secNum = parseInt(sec, 10);
    if (sec === "00") {
      if (min === "00") {
        return ["00", "00"];
      }
      const newMin =
        `${minNum - 1}`.length >= 2 ? `${minNum - 1}` : `0${minNum - 1}`;
      return [newMin, "59"];
    }
    const newSec =
      `${secNum - 1}`.length === 2 ? `${secNum - 1}` : `0${secNum - 1}`;
    return [min, newSec];
  };

  const startTimer = (id) => {
    const taskIndex = taskList.findIndex((task) => task.id === id);
    if (
      taskList[taskIndex].timerId ||
      taskList[taskIndex].status === "completed"
    ) {
      return;
    }
    const timerId = setInterval(() => {
      setTaskList((tasks) => {
        const newTasks = JSON.parse(JSON.stringify(tasks));
        const sec = newTasks[taskIndex].timerSec;
        const min = newTasks[taskIndex].timerMin;
        let [newMin, newSec] = updateTimer(min, sec);
        if (newMin === "00" && newSec === "00") {
          stopTimer(newTasks[taskIndex].id);
          [newMin, newSec] = newTasks[taskIndex].initialTimer;
        }
        newTasks[taskIndex].timerSec = newSec;
        newTasks[taskIndex].timerMin = newMin;
        return newTasks;
      });
    }, 1000);
    setTaskList((tasks) => {
      const newTasks = JSON.parse(JSON.stringify(tasks));
      newTasks[taskIndex].timerId = timerId;
      return newTasks;
    });
  };

  return (
    <section className="todoapp">
      <Header addTask={addTask} />
      <section className="main">
        <TaskList
          tasks={filterTasks()}
          editDescription={editDescription}
          changeStatus={changeStatus}
          deleteTask={deleteTask}
          startTimer={startTimer}
          stopTimer={stopTimer}
        />

        <Footer
          clearCompleted={clearCompleted}
          completedTasksCount={activeCount()}
          changeActiveFilterName={changeActiveFilterName}
          activeFilterName={activeFilterName}
        />
      </section>
    </section>
  );
}

export default App;
