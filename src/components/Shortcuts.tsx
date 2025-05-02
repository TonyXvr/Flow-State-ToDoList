import React, { useEffect, useState } from 'react';
import { KeyRound } from 'lucide-react';

const Shortcuts: React.FC = () => {
  const [showShortcuts, setShowShortcuts] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show shortcuts when pressing ?
      if (e.key === '?' && e.shiftKey) {
        e.preventDefault();
        setShowShortcuts(prev => !prev);
      }
      
      // Hide shortcuts when pressing Escape
      if (e.key === 'Escape' && showShortcuts) {
        setShowShortcuts(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showShortcuts]);

  return (
    <>
      <button 
        onClick={() => setShowShortcuts(prev => !prev)}
        className="fixed bottom-4 right-4 p-2 rounded-none border border-tron-glow/50 bg-tron-surface hover:bg-tron-surface-hover text-tron-dim hover:text-tron-glow transition-all duration-200 hover:shadow-tron-sm"
        aria-label="Show keyboard shortcuts"
      >
        <KeyRound className="h-5 w-5" />
      </button>

      {showShortcuts && (
        <div className="fixed inset-0 bg-tron-darker/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-tron-surface p-6 rounded-none border border-tron-glow/50 max-w-md w-full shadow-tron-md">
            <h2 className="text-xl font-bold text-tron-glow mb-4 tracking-wider">KEYBOARD SHORTCUTS</h2>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-tron-dim">Add new task</span>
                <kbd className="px-2 py-1 bg-tron-darker rounded-none text-sm text-tron-text border border-tron-glow/30">Alt + N</kbd>
              </li>
              <li className="flex justify-between">
                <span className="text-tron-dim">Show/hide shortcuts</span>
                <kbd className="px-2 py-1 bg-tron-darker rounded-none text-sm text-tron-text border border-tron-glow/30">Shift + ?</kbd>
              </li>
              <li className="flex justify-between">
                <span className="text-tron-dim">Save edit</span>
                <kbd className="px-2 py-1 bg-tron-darker rounded-none text-sm text-tron-text border border-tron-glow/30">Enter</kbd>
              </li>
              <li className="flex justify-between">
                <span className="text-tron-dim">Cancel edit</span>
                <kbd className="px-2 py-1 bg-tron-darker rounded-none text-sm text-tron-text border border-tron-glow/30">Escape</kbd>
              </li>
            </ul>
            <button 
              onClick={() => setShowShortcuts(false)}
              className="mt-6 w-full py-2 border border-tron-glow text-tron-glow hover:bg-tron-glow/10 hover:shadow-tron-sm transition-all duration-200"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Shortcuts;
