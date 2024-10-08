import React, { useState } from 'react';
import AddTask from './components/AddTasks';
import TaskList from './components/TaskList';
import CompletedTasks from './components/CompletedTasks';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-5">
        <h1 className="text-center text-3xl font-bold">React Redux To-Do List</h1>
      </header>
      <main className="p-5">
        {/* Add Task Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={openModal}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        </div>

        {/* Modal for AddTask */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Add Task Modal"
          className="max-w-md mx-auto bg-white p-2 rounded shadow-lg outline-none"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <AddTask onClose={closeModal} />
        </Modal>

        {/* Task Lists */}
        <TaskList />
        <CompletedTasks />
      </main>
      <footer className="bg-blue-600 text-white py-3 fixed bottom-0 w-full">
        <p className="text-center">© 2024 To-Do App</p>
      </footer>
    </div>
  );
}

export default App;
