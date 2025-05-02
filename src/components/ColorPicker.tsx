import React from 'react';
import { TASK_COLORS } from '../hooks/useTodos';

interface ColorPickerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
  onClose: () => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ currentColor, onColorChange, onClose }) => {
  return (
    <div className="absolute right-0 top-full mt-2 p-2 bg-tron-surface border border-tron-glow/30 shadow-tron-md z-10 rounded-none">
      <div className="grid grid-cols-4 gap-2">
        {TASK_COLORS.map((color) => (
          <button
            key={color}
            className={`w-6 h-6 rounded-full transition-transform duration-200 hover:scale-110 ${
              color === currentColor ? 'ring-2 ring-white' : ''
            }`}
            style={{ backgroundColor: color }}
            onClick={() => {
              onColorChange(color);
              onClose();
            }}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
