import React from 'react';

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

export const QRCode: React.FC<QRCodeProps> = ({ value, size = 40, className = "" }) => {
  // Generate a simple QR-like pattern based on the value
  const generatePattern = (str: string) => {
    const grid = Array(8).fill(null).map(() => Array(8).fill(false));
    const hash = str.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        grid[i][j] = ((hash >> (i * 8 + j)) & 1) === 1;
      }
    }
    return grid;
  };

  const pattern = generatePattern(value);

  return (
    <div 
      className={`bg-white border-2 border-primary/20 rounded-md ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="grid grid-cols-8 h-full w-full p-1">
        {pattern.flat().map((filled, index) => (
          <div
            key={index}
            className={`${filled ? 'bg-foreground' : 'bg-transparent'} rounded-[1px]`}
          />
        ))}
      </div>
    </div>
  );
};