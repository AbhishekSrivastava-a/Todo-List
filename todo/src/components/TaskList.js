import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDeleteTask, onToggleTask, onUpdateTask }) {
  if (tasks.length === 0) {
    return <div className="empty-state">No tasks yet. Add one to get started!</div>;
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onToggleTask={onToggleTask}
          onUpdateTask={onUpdateTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;