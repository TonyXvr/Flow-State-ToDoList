import React, { useEffect, useRef } from 'react';

const TronBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Grid properties
    const gridSize = 40;
    const lineWidth = 1;
    
    // Circuit nodes
    const nodes: {x: number, y: number, connections: number[]}[] = [];
    const createNodes = () => {
      nodes.length = 0;
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);
      
      // Create grid nodes with 15% chance of being active
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (Math.random() < 0.15) {
            const nodeIndex = nodes.length;
            nodes.push({
              x: x * gridSize,
              y: y * gridSize,
              connections: []
            });
            
            // Connect to nearby nodes (if they exist)
            for (let i = 0; i < nodeIndex; i++) {
              const otherNode = nodes[i];
              const dx = Math.abs(otherNode.x - x * gridSize);
              const dy = Math.abs(otherNode.y - y * gridSize);
              
              // Only connect if nodes are adjacent in the grid
              if ((dx === gridSize && dy === 0) || (dx === 0 && dy === gridSize)) {
                if (Math.random() < 0.7) { // 70% chance to connect adjacent nodes
                  nodes[nodeIndex].connections.push(i);
                  otherNode.connections.push(nodeIndex);
                }
              }
            }
          }
        }
      }
    };
    
    createNodes();
    
    // Energy pulses
    const pulses: {nodeIndex: number, progress: number, speed: number}[] = [];
    const addPulse = () => {
      if (nodes.length === 0) return;
      const randomNodeIndex = Math.floor(Math.random() * nodes.length);
      pulses.push({
        nodeIndex: randomNodeIndex,
        progress: 0,
        speed: 0.01 + Math.random() * 0.02
      });
      
      // Limit number of pulses
      if (pulses.length > 15) {
        pulses.shift();
      }
    };
    
    // Add initial pulses
    for (let i = 0; i < 5; i++) {
      addPulse();
    }
    
    // Animation
    let animationId: number;
    let lastPulseTime = 0;
    
    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw base grid
      ctx.strokeStyle = 'rgba(0, 24, 64, 0.3)';
      ctx.lineWidth = lineWidth;
      
      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Draw circuit connections
      ctx.strokeStyle = 'rgba(0, 120, 255, 0.4)';
      ctx.lineWidth = 1.5;
      
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        for (const connectedIndex of node.connections) {
          if (connectedIndex > i) { // Avoid drawing connections twice
            const connectedNode = nodes[connectedIndex];
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(connectedNode.x, connectedNode.y);
            ctx.stroke();
          }
        }
      }
      
      // Draw nodes
      ctx.fillStyle = 'rgba(0, 180, 255, 0.6)';
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Update and draw pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.progress += pulse.speed;
        
        if (pulse.progress >= 1) {
          // Move pulse to a connected node
          const currentNode = nodes[pulse.nodeIndex];
          if (currentNode.connections.length > 0) {
            const randomConnection = Math.floor(Math.random() * currentNode.connections.length);
            pulse.nodeIndex = currentNode.connections[randomConnection];
            pulse.progress = 0;
          } else {
            // Remove pulse if no connections
            pulses.splice(i, 1);
            continue;
          }
        }
        
        // Draw pulse
        const currentNode = nodes[pulse.nodeIndex];
        if (currentNode.connections.length > 0) {
          const connectedIndex = currentNode.connections[0];
          const connectedNode = nodes[connectedIndex];
          
          const startX = currentNode.x;
          const startY = currentNode.y;
          const endX = connectedNode.x;
          const endY = connectedNode.y;
          
          const pulseX = startX + (endX - startX) * pulse.progress;
          const pulseY = startY + (endY - startY) * pulse.progress;
          
          // Pulse glow
          const gradient = ctx.createRadialGradient(
            pulseX, pulseY, 0,
            pulseX, pulseY, 20
          );
          gradient.addColorStop(0, 'rgba(0, 220, 255, 0.8)');
          gradient.addColorStop(1, 'rgba(0, 220, 255, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 20, 0, Math.PI * 2);
          ctx.fill();
          
          // Pulse core
          ctx.fillStyle = 'rgba(200, 255, 255, 0.9)';
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Add new pulse occasionally
      if (timestamp - lastPulseTime > 1000) { // Every second
        addPulse();
        lastPulseTime = timestamp;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-tron-dark">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="fixed inset-0 bg-gradient-radial from-transparent to-tron-dark opacity-70"></div>
      <div className="fixed inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
    </div>
  );
};

export default TronBackground;
