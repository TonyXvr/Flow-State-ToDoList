import { useState, useEffect } from 'react';
import { Todo, SubTask } from '../types';

// Default colors for tasks
export const TASK_COLORS = [
  '#00a8ff', // Default blue
  '#ff5a5f', // Red
  '#00c781', // Green
  '#ffb400', // Yellow
  '#9747ff', // Purple
  '#ff9f1c', // Orange
  '#00b8d9', // Cyan
  '#ff7eb6', // Pink
];

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('flowdo-todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      // Migrate old todos without color or subtasks
      return parsedTodos.map((todo: any) => ({
        ...todo,
        color: todo.color || TASK_COLORS[0],
        subtasks: todo.subtasks || [],
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('flowdo-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    if (text.trim() === '') return;
    
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
      color: TASK_COLORS[0], // Default color
      subtasks: [],
    };
    
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    if (text.trim() === '') return;
    
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text } : todo
      )
    );
  };

  const changeTodoColor = (id: string, color: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, color } : todo
      )
    );
  };

  // Subtask functions
  const addSubtask = (todoId: string, text: string) => {
    if (text.trim() === '') return;
    
    const newSubtask: SubTask = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId 
          ? { ...todo, subtasks: [...todo.subtasks, newSubtask] } 
          : todo
      )
    );
  };

  const toggleSubtask = (todoId: string, subtaskId: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId 
          ? { 
              ...todo, 
              subtasks: todo.subtasks.map(subtask =>
                subtask.id === subtaskId 
                  ? { ...subtask, completed: !subtask.completed } 
                  : subtask
              ) 
            } 
          : todo
      )
    );
  };

  const deleteSubtask = (todoId: string, subtaskId: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId 
          ? { 
              ...todo, 
              subtasks: todo.subtasks.filter(subtask => subtask.id !== subtaskId) 
            } 
          : todo
      )
    );
  };

  const editSubtask = (todoId: string, subtaskId: string, text: string) => {
    if (text.trim() === '') return;
    
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId 
          ? { 
              ...todo, 
              subtasks: todo.subtasks.map(subtask =>
                subtask.id === subtaskId 
                  ? { ...subtask, text } 
                  : subtask
              ) 
            } 
          : todo
      )
    );
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    changeTodoColor,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    editSubtask,
  };
}
