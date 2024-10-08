import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleComplete, deleteTask, editTask } from '../features/tasks/taskSlice';
import { validateTask } from '../utils/validation';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [errors, setErrors] = useState({});

  const handleToggle = () => {
    dispatch(toggleComplete(task.id));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditedTask({
      ...editedTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const validationErrors = validateTask(editedTask, true); // Pass true if needed
    if (Object.keys(validationErrors).length === 0) {
      dispatch(editTask(editedTask));
      setIsEditing(false);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask({ ...task });
    setErrors({});
  };

  return (
    <div className={`p-4 mb-4 rounded ${task.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
      {isEditing ? (
        <div>
          {/* Name */}
          <div className="mb-2">
            <input
              type="text"
              name="name"
              value={editedTask.name}
              onChange={handleChange}
              className={`w-full px-2 py-1 border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="mb-2">
            <input
              type="email"
              name="email"
              value={editedTask.email}
              onChange={handleChange}
              className={`w-full px-2 py-1 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Number */}
          <div className="mb-2">
            <input
              type="text"
              name="number"
              value={editedTask.number}
              onChange={handleChange}
              className={`w-full px-2 py-1 border ${
                errors.number ? 'border-red-500' : 'border-gray-300'
              } rounded`}
              maxLength="10"
            />
            {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
          </div>

          {/* Address */}
          <div className="mb-2">
            <input
              type="text"
              name="address"
              value={editedTask.address}
              onChange={handleChange}
              className={`w-full px-2 py-1 border ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              } rounded`}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          {/* Description */}
          <div className="mb-2">
            <textarea
              name="description"
              value={editedTask.description}
              onChange={handleChange}
              className={`w-full px-2 py-1 border ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              } rounded`}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold">{task.name}</h3>
          <p>
            <strong>Email:</strong> {task.email}
          </p>
          <p>
            <strong>Number:</strong> {task.number}
          </p>
          <p>
            <strong>Address:</strong> {task.address}
          </p>
          <p>
            <strong>Description:</strong> {task.description}
          </p>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={handleToggle}
              className={`px-3 py-1 rounded ${
                task.completed
                  ? 'bg-yellow-500 hover:bg-yellow-600'
                  : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {task.completed ? 'Uncomplete' : 'Complete'}
            </button>
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
