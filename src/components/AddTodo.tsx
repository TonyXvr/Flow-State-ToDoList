import React, { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+N to focus the input
      if (e.altKey && e.key === 'n') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-center gap-2 p-4 mb-6 bg-tron-surface rounded-none border border-tron-glow/30 transition-all duration-200 hover:bg-tron-surface-hover hover:border-tron-glow/50 focus-within:border-tron-glow/70 focus-within:shadow-tron-sm"
    >
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done, Anon? (Alt+N)"
        className="flex-1 bg-transparent text-tron-text outline-none placeholder:text-tron-dim"
        autoComplete="off"
      />
      <button 
        type="submit"
        className="p-2 rounded-none bg-transparent border border-tron-glow text-tron-glow hover:bg-tron-glow/10 hover:shadow-tron-sm transition-all duration-200"
        aria-label="Add todo"
      >
        <Plus className="h-5 w-5" />
      </button>
    </form>
  );
};

export default AddTodo;
