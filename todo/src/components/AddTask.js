import React, { useState } from 'react';

function AddTask({ onAddTask }) {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAddTask(taskName.trim());
      setTaskName('');
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-task-input"
        placeholder="Add a new task..."
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button type="submit" className="add-task-button">Add</button>
    </form>
  );
}

export default AddTask;