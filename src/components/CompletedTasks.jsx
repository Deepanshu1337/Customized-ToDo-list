import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleComplete, deleteTask, clearCompleted } from '../features/tasks/taskSlice';

const CompletedTasks = () => {
  const dispatch = useDispatch();
  const completedTasks = useSelector(state => state.tasks.tasks.filter(task => task.completed));

  const handleClear = () => {
    dispatch(clearCompleted());
  };

  if (completedTasks.length === 0) return null;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Completed Tasks</h2>
        <button
          onClick={handleClear}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Clear All
        </button>
      </div>
      {completedTasks.map(task => (
        <div key={task.id} className="p-4 mb-4 bg-green-100 rounded">
          <h3 className="text-xl font-semibold">{task.name}</h3>
          <p><strong>Email:</strong> {task.email}</p>
          <p><strong>Number:</strong> {task.number}</p>
          <p><strong>Address:</strong> {task.address}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={() => dispatch(toggleComplete(task.id))}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
            >
              Uncomplete
            </button>
            <button
              onClick={() => dispatch(deleteTask(task.id))}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedTasks;
