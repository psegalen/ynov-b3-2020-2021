/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import './App.css';
import TasksList from './TasksList';

const App = () => {
  const initialTasks = [
      { id: "0", title: "Learn HTML", isCompleted: true },
      { id: "1", title: "Learn CSS", isCompleted: true },
      { id: "2", title: "Learn JavaScript", isCompleted: true },
      { id: "3", title: "Learn React", isCompleted: false },
      { id: "4", title: "Learn React Native", isCompleted: false },
  ];
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <div className="App">
      <h1>Mes choses à faire</h1>
      <hr />
      <TasksList tasks={tasks} toggleIsCompleted={(task) => {
        const newTasks = tasks.slice();
        for (let i = 0; i < newTasks.length; i++) {
          const newTask = newTasks[i];
          if (newTask.id === task.id) {
            newTasks[i] = { ...task, isCompleted: !task.isCompleted };
          }
        }
        setTasks(newTasks);
      }} />
      <a href="#">+ Nouvelle tâche</a>
    </div>
  );
}

export default App;
