import React from 'react';

const TronLogo: React.FC = () => {
  return (
    <div className="w-16 h-16 mx-auto mb-4">
      {/* Identity Disc - Outer Ring */}
      <svg 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
        className="identity-disc"
      >
        {/* Outer Ring with Pulse */}
        <circle 
          cx="50" 
          cy="50" 
          r="48" 
          fill="none" 
          stroke="#00a8ff" 
          strokeWidth="1"
          opacity="0.8"
          className="disc-pulse"
        />
        
        {/* Middle Ring */}
        <circle 
          cx="50" 
          cy="50" 
          r="40" 
          fill="none" 
          stroke="#00a8ff" 
          strokeWidth="1"
          opacity="0.6"
        />
        
        {/* Inner Ring with Glow and Pulse */}
        <circle 
          cx="50" 
          cy="50" 
          r="32" 
          fill="none" 
          stroke="#00a8ff" 
          strokeWidth="2"
          opacity="1"
          className="disc-pulse-delayed"
        />
        
        {/* Center Circle with Pulse */}
        <circle 
          cx="50" 
          cy="50" 
          r="8" 
          fill="#00a8ff" 
          opacity="0.9"
          className="center-pulse"
        />
        
        {/* Circuit Lines */}
        <g className="identity-disc-inner">
          {/* Horizontal Line */}
          <line 
            x1="10" 
            y1="50" 
            x2="90" 
            y2="50" 
            stroke="#00a8ff" 
            strokeWidth="1"
            opacity="0.7"
          />
          
          {/* Vertical Line */}
          <line 
            x1="50" 
            y1="10" 
            x2="50" 
            y2="90" 
            stroke="#00a8ff" 
            strokeWidth="1"
            opacity="0.7"
          />
          
          {/* Diagonal Lines */}
          <line 
            x1="20" 
            y1="20" 
            x2="80" 
            y2="80" 
            stroke="#00a8ff" 
            strokeWidth="1"
            opacity="0.5"
          />
          
          <line 
            x1="80" 
            y1="20" 
            x2="20" 
            y2="80" 
            stroke="#00a8ff" 
            strokeWidth="1"
            opacity="0.5"
          />
        </g>
      </svg>
    </div>
  );
};

export default TronLogo;
