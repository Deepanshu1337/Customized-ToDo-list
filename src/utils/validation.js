// src/utils/validation.js

/**
 * Validates a task object.
 * @param {Object} task - The task object to validate.
 * @param {boolean} isEdit - Flag to indicate if it's an edit operation.
 * @returns {Object} errors - An object containing validation error messages.
 */
export const validateTask = (task, isEdit = false) => {
    const errors = {};
  
    // Name: max 15 chars, required, no special characters
    if (!task.name.trim()) {
      errors.name = 'Name is required';
    } else if (task.name.length > 15) {
      errors.name = 'Name must be 15 characters or less';
    } else if (!/^[a-zA-Z\s]+$/.test(task.name)) {
      errors.name = 'Name must not contain special characters or numbers';
    }
  
    // Email: max 15 chars, required, valid format
    if (!task.email.trim()) {
      errors.email = 'Email is required';
    } else if (task.email.length > 15) {
      errors.email = 'Email must be 15 characters or less';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(task.email)) {
      errors.email = 'Email is invalid';
    }
  
    // Number: 10 digits, required
    if (!task.number.trim()) {
      errors.number = 'Number is required';
    } else if (!/^\d{10}$/.test(task.number)) {
      errors.number = 'Number must be 10 digits';
    }
  
    // Address: required
    if (!task.address.trim()) {
      errors.address = 'Address is required';
    }
  
    // Description: required
    if (!task.description.trim()) {
      errors.description = 'Description is required';
    }
  
    return errors;
  };
  