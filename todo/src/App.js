import React, { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log("App Mounted ");
    console.log("1. Attempting to load tasks from localStorage...");
    try {
      const storedTasks = localStorage.getItem('tasks');
      console.log("2. Raw data retrieved from localStorage:", storedTasks);
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        console.log("3. Parsed tasks from localStorage:", parsedTasks);
        setTasks(parsedTasks);
      } else {
        console.log("3. No 'tasks' key found in localStorage. Initializing with empty array.");
        setTasks([]);
      }
    } catch (error) {
      console.error("ERROR: Failed to parse or retrieve tasks from localStorage!", error);
      localStorage.removeItem('tasks');
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    console.log("4. 'tasks' state changed. Saving to localStorage:", tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskName) => {
    console.log("5. addTask called with:", taskName);
    const newTask = { id: Date.now(), name: taskName, completed: false };
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      console.log("6. State update: new tasks array (before save useEffect):", updatedTasks);
      return updatedTasks;
    });
  };

  const deleteTask = (taskId) => {
    console.log("7. deleteTask called for ID:", taskId);
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter(task => task.id !== taskId);
      console.log("8. State update: tasks after deletion (before save useEffect):", updatedTasks);
      return updatedTasks;
    });
  };

  const toggleTaskCompletion = (taskId) => {
    console.log("9. toggleTaskCompletion called for ID:", taskId);
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      console.log("10. State update: tasks after toggle (before save useEffect):", updatedTasks);
      return updatedTasks;
    });
  };

  const updateTask = (taskId, newName) => {
    console.log("11. updateTask called for ID:", taskId, "with new name:", newName);
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map(task =>
        task.id === taskId ? { ...task, name: newName } : task
      );
      console.log("12. State update: tasks after update (before save useEffect):", updatedTasks);
      return updatedTasks;
    });
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>My Tasks</h1>
      </div>
      <AddTask onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onDeleteTask={deleteTask}
        onToggleTask={toggleTaskCompletion}
        onUpdateTask={updateTask}
      />
    </div>
  );
}

export default App;
