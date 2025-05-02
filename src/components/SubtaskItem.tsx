import React, { useState, useRef, useEffect } from 'react';
import { Check, Trash2, Edit2 } from 'lucide-react';
import { SubTask } from '../types';

interface SubtaskItemProps {
  subtask: SubTask;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const SubtaskItem: React.FC<SubtaskItemProps> = ({ subtask, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(subtask.text);
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
      onEdit(subtask.id, editText);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(subtask.text);
      setIsEditing(false);
    }
  };

  return (
    <li className="group flex items-center gap-3 py-2 pl-8 pr-4 border-t border-tron-glow/10 transition-all duration-200">
      <button
        onClick={() => onToggle(subtask.id)}
        className={`flex-shrink-0 w-4 h-4 rounded-none border flex items-center justify-center transition-colors duration-200 ${
          subtask.completed 
            ? 'bg-tron-glow/20 border-tron-glow shadow-tron-sm' 
            : 'border-tron-dim hover:border-tron-glow'
        }`}
        aria-label={subtask.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {subtask.completed && <Check className="h-3 w-3 text-tron-glow" />}
      </button>
      
      {isEditing ? (
        <input
          ref={editInputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-tron-text outline-none border-b border-tron-dim focus:border-tron-glow text-sm"
          autoComplete="off"
        />
      ) : (
        <span 
          className={`flex-1 text-sm ${
            subtask.completed 
              ? 'text-tron-dim line-through' 
              : 'text-tron-text'
          }`}
        >
          {subtask.text}
        </span>
      )}
      
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="text-tron-dim hover:text-tron-glow transition-colors duration-200"
            aria-label="Edit subtask"
          >
            <Edit2 className="h-3 w-3" />
          </button>
        )}
        <button
          onClick={() => onDelete(subtask.id)}
          className="text-tron-dim hover:text-red-400 transition-colors duration-200"
          aria-label="Delete subtask"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>
    </li>
  );
};

export default SubtaskItem;
