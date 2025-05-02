import React, { useEffect } from 'react';
import Header from './components/Header';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Shortcuts from './components/Shortcuts';
import TronBackground from './components/AuroraBackground';
import { useTodos } from './hooks/useTodos';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos();

  // Set dark background for the entire app
  useEffect(() => {
    document.body.classList.add('bg-tron-dark');
    return () => {
      document.body.classList.remove('bg-tron-dark');
    };
  }, []);

  return (
    <div className="min-h-screen text-tron-text relative">
      <TronBackground />
      
      <div className="max-w-2xl mx-auto px-4 py-8 relative z-10">
        <Header />
        
        <main className="mt-8">
          <AddTodo onAdd={addTodo} />
          
          <TodoList 
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </main>

        <footer className="mt-12 text-center text-tron-dim text-sm">
          <p>Press <kbd className="px-1 py-0.5 bg-tron-surface rounded text-xs border border-tron-glow/30 shadow-tron-sm">Shift + ?</kbd> to view keyboard shortcuts</p>
        </footer>
      </div>
      
      <Shortcuts />
    </div>
  );
}

export default App;
