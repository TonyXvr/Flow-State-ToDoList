import React from 'react';
import Header from './components/Header';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Shortcuts from './components/Shortcuts';
import AuroraBackground from './components/AuroraBackground';
import { useTodos } from './hooks/useTodos';

function App() {
  const { 
    todos, 
    addTodo, 
    toggleTodo, 
    deleteTodo, 
    editTodo,
    changeTodoColor,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    editSubtask
  } = useTodos();

  return (
    <div className="min-h-screen text-tron-text">
      <AuroraBackground />
      
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <Header />
        
        <main className="mt-8">
          <AddTodo onAdd={addTodo} />
          
          <TodoList 
            todos={todos} 
            onToggle={toggleTodo} 
            onDelete={deleteTodo} 
            onEdit={editTodo}
            onColorChange={changeTodoColor}
            onAddSubtask={addSubtask}
            onToggleSubtask={toggleSubtask}
            onDeleteSubtask={deleteSubtask}
            onEditSubtask={editSubtask}
          />
        </main>
        
        <Shortcuts />
      </div>
    </div>
  );
}

export default App;
