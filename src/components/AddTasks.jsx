import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/taskSlice';
import { v4 as uuidv4 } from 'uuid';
import { validateTask } from '../utils/validation';

const AddTask = ({ onClose }) => {
  const dispatch = useDispatch();

  const [task, setTask] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateTask(task);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(addTask({ ...task, id: uuidv4(), completed: false }));
      setTask({
        name: '',
        email: '',
        number: '',
        address: '',
        description: '',
      });
      setErrors({});
      onClose(); 
    } else {
      setErrors(validationErrors);
    }
  };

  const handleCancel = () => {
    onClose(); 
  };

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className="max-w-[800px] min-w-[400px] mx-auto p-2 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={task.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email type-text is taken as instructed  */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="text"
            name="email"
            value={task.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Number */}
        <div className="mb-4">
          <label className="block text-gray-700">Number</label>
          <input
            type="text"
            name="number"
            value={task.number}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.number ? 'border-red-500' : 'border-gray-300'
            } rounded`}
            maxLength="10"
          />
          {errors.number && (
            <p className="text-red-500 text-sm mt-1">{errors.number}</p>
          )}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={task.address}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Form Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Add Task
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddTask;
