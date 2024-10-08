import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks.tasks.filter(task => !task.completed));

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">To-Do List</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks to display.</p>
      ) : (
        tasks.map(task => <TaskItem key={task.id} task={task} />)
      )}
    </div>
  );
};

export default TaskList;
