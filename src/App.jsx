import { useState } from 'react'
import TodoModal from './Components/modalWindow/TodoModal';
import Login from './Components/registration/Login';

function App() {

  return (
    <>
      <TodoModal 
        // isOpen={isModalOpen} 
        // onClose={() => setModalOpen(false)} 
        // onAddTask={handleAddTask} 
      />
      <Login/>
    </>
  )
}

export default App
