import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { QRCode } from './QRCode';

interface CartItemProps {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  quantity: number;
  onQuantityChange: (id: string, change: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  category,
  description,
  image,
  quantity,
  onQuantityChange,
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div className="absolute -top-2 -left-2 w-8 h-8 bg-neon-blue rounded-full flex items-center justify-center text-xs font-bold text-black">
            {quantity}
          </div>
        </div>
        
        <div className="flex-1 space-y-2">
          <div>
            <h3 className="font-semibold text-primary text-lg">{name}</h3>
            <p className="text-neon-purple text-sm font-medium">{category}</p>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <QRCode value={id} size={40} />
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-primary/20 hover:bg-primary/10"
            onClick={() => onQuantityChange(id, -1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <span className="w-8 text-center font-semibold">{quantity}</span>
          
          <Button
            variant="default"
            size="icon"
            className="h-8 w-8 rounded-full bg-primary hover:bg-primary/80"
            onClick={() => onQuantityChange(id, 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};