import React, { useState } from 'react';

function TaskItem({ task, onDeleteTask, onToggleTask, onUpdateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);

  const handleUpdate = () => {
    if (newName.trim()) {
      onUpdateTask(task.id, newName.trim());
      setIsEditing(false);
    }
  };

  return (
    <li className="task-item">
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggleTask(task.id)}
      />
      {isEditing ? (
        <input
          type="text"
          className="update-task-input"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleUpdate}
          onKeyPress={(e) => e.key === 'Enter' && handleUpdate()}
          autoFocus
        />
      ) : (
        <span
          className={`task-text ${task.completed ? 'completed' : ''}`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {task.name}
        </span>
      )}
      <div className="task-actions">
        <button className="action-button" onClick={() => setIsEditing(!isEditing)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
        </button>
        <button className="action-button" onClick={() => onDeleteTask(task.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        </button>
      </div>
    </li>
  );
}

export default TaskItem;