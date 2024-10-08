import { createSlice } from '@reduxjs/toolkit';

// Fetch tasks from localStorage if available
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('tasks');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load state", e);
    return [];
  }
};

// Save tasks to localStorage
const saveState = (tasks) => {
  try {
    const serializedState = JSON.stringify(tasks);
    localStorage.setItem('tasks', serializedState);
  } catch (e) {
    console.warn("Could not save state", e);
  }
};

const initialState = {
  tasks: loadState(),
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveState(state.tasks);
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveState(state.tasks);
      }
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveState(state.tasks);
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveState(state.tasks);
    },
    clearCompleted: (state) => {
      state.tasks = state.tasks.filter(task => !task.completed);
      saveState(state.tasks);
    },
  },
});

export const { addTask, editTask, toggleComplete, deleteTask, clearCompleted } = taskSlice.actions;

export default taskSlice.reducer;
