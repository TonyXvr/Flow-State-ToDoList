import React, { useState, useRef, useEffect } from 'react';
import { Check, Trash2, Edit2, ChevronDown, ChevronUp, Palette } from 'lucide-react';
import { Todo } from '../types';
import SubtaskItem from './SubtaskItem';
import AddSubtask from './AddSubtask';
import ColorPicker from './ColorPicker';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onColorChange: (id: string, color: string) => void;
  onAddSubtask: (todoId: string, text: string) => void;
  onToggleSubtask: (todoId: string, subtaskId: string) => void;
  onDeleteSubtask: (todoId: string, subtaskId: string) => void;
  onEditSubtask: (todoId: string, subtaskId: string, text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  onToggle, 
  onDelete, 
  onEdit,
  onColorChange,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
  onEditSubtask
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    // Close color picker when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const hasCompletedSubtasks = todo.subtasks.some(subtask => subtask.completed);
  const allSubtasksCompleted = todo.subtasks.length > 0 && todo.subtasks.every(subtask => subtask.completed);
  const subtaskProgress = todo.subtasks.length > 0 
    ? Math.round((todo.subtasks.filter(s => s.completed).length / todo.subtasks.length) * 100) 
    : 0;

  return (
    <li className="group animate-fade-in bg-tron-surface p-4 rounded-none mb-3 transition-all duration-200 hover:bg-tron-surface-hover border border-tron-glow/30 hover:border-tron-glow/50 hover:shadow-tron-sm">
      <div className="flex items-center gap-3">
        {/* Color-coded disc */}
        <div className="relative" ref={colorPickerRef}>
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="flex-shrink-0 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ backgroundColor: todo.color }}
            aria-label="Change task color"
          >
            {showColorPicker && (
              <Palette className="h-3 w-3 text-white/70" />
            )}
          </button>
          
          {showColorPicker && (
            <ColorPicker 
              currentColor={todo.color}
              onColorChange={(color) => onColorChange(todo.id, color)}
              onClose={() => setShowColorPicker(false)}
            />
          )}
        </div>
        
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
          {todo.subtasks.length > 0 && (
            <button
              onClick={() => setShowSubtasks(!showSubtasks)}
              className="text-tron-dim hover:text-tron-glow transition-colors duration-200"
              aria-label={showSubtasks ? "Hide subtasks" : "Show subtasks"}
            >
              {showSubtasks ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Subtask progress bar */}
      {todo.subtasks.length > 0 && (
        <div className="mt-2">
          <div className="flex justify-between text-xs text-tron-dim mb-1">
            <span>Subtasks: {todo.subtasks.filter(s => s.completed).length}/{todo.subtasks.length}</span>
            <span>{subtaskProgress}%</span>
          </div>
          <div className="w-full h-1 bg-tron-surface-hover overflow-hidden">
            <div 
              className="h-full transition-all duration-300"
              style={{ 
                width: `${subtaskProgress}%`,
                backgroundColor: allSubtasksCompleted ? '#00c781' : hasCompletedSubtasks ? todo.color : 'transparent'
              }}
            />
          </div>
        </div>
      )}
      
      {/* Subtasks section */}
      {(showSubtasks || todo.subtasks.length === 0) && (
        <div className="mt-3">
          {todo.subtasks.length > 0 && (
            <ul className="border-t border-tron-glow/10 mt-2">
              {todo.subtasks.map(subtask => (
                <SubtaskItem
                  key={subtask.id}
                  subtask={subtask}
                  onToggle={(subtaskId) => onToggleSubtask(todo.id, subtaskId)}
                  onDelete={(subtaskId) => onDeleteSubtask(todo.id, subtaskId)}
                  onEdit={(subtaskId, text) => onEditSubtask(todo.id, subtaskId, text)}
                />
              ))}
            </ul>
          )}
          <AddSubtask onAdd={(text) => onAddSubtask(todo.id, text)} />
        </div>
      )}
    </li>
  );
};

export default TodoItem;
