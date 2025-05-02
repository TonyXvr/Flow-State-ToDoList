import React, { useState, useRef, useEffect } from 'react';
import { Check, Trash2, Edit2 } from 'lucide-react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim() !== '') {
      onEdit(todo.id, editText);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className="group animate-fade-in bg-tron-surface p-4 rounded-none mb-3 transition-all duration-200 hover:bg-tron-surface-hover border border-tron-glow/30 hover:border-tron-glow/50 hover:shadow-tron-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-none border flex items-center justify-center transition-colors duration-200 ${
            todo.completed 
              ? 'bg-tron-glow/20 border-tron-glow shadow-tron-sm' 
              : 'border-tron-dim hover:border-tron-glow'
          }`}
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.completed && <Check className="h-4 w-4 text-tron-glow" />}
        </button>
        
        {isEditing ? (
          <input
            ref={editInputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-tron-text outline-none border-b border-tron-dim focus:border-tron-glow"
            autoComplete="off"
          />
        ) : (
          <span 
            className={`flex-1 ${
              todo.completed 
                ? 'text-tron-dim line-through' 
                : 'text-tron-text'
            }`}
          >
            {todo.text}
          </span>
        )}
        
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="text-tron-dim hover:text-tron-glow transition-colors duration-200"
              aria-label="Edit todo"
            >
              <Edit2 className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => onDelete(todo.id)}
            className="text-tron-dim hover:text-red-400 transition-colors duration-200"
            aria-label="Delete todo"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
