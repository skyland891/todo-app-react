import React from 'react'
import Footer from './components/footer/';
import Header from './components/header';
import TaskList from './components/task-list';
import './App.css'

function App() {
  return (
    <section className="todoapp">
      <Header/>
      <section className="main">
        <TaskList/>
        <Footer/>
      </section>
    </section>
  );
}

export default App;
