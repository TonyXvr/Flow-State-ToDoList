import React, { useState, useRef } from 'react';
import { Plus } from 'lucide-react';

interface AddSubtaskProps {
  onAdd: (text: string) => void;
}

const AddSubtask: React.FC<AddSubtaskProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setText('');
    setIsAdding(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => {
          setIsAdding(true);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        className="flex items-center gap-2 pl-8 py-2 text-sm text-tron-dim hover:text-tron-glow transition-colors duration-200"
      >
        <Plus className="h-3 w-3" />
        <span>Add subtask</span>
      </button>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="pl-8 py-2 border-t border-tron-glow/10"
    >
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a subtask..."
        className="w-full bg-transparent text-tron-text outline-none border-b border-tron-dim focus:border-tron-glow text-sm"
        autoComplete="off"
      />
      <div className="flex gap-2 mt-2 justify-end">
        <button
          type="button"
          onClick={handleCancel}
          className="px-2 py-1 text-xs text-tron-dim hover:text-tron-text"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-2 py-1 text-xs bg-transparent border border-tron-glow text-tron-glow hover:bg-tron-glow/10 transition-all duration-200"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddSubtask;
