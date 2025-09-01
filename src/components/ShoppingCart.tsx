import React, { useState } from 'react';
import { CartItem } from './CartItem';
import { Button } from '@/components/ui/button';
import { ShoppingCart as CartIcon, Sparkles } from 'lucide-react';
import goldenDress from '@/assets/golden-party-dress.jpg';
import smartBoots from '@/assets/smart-combat-boots.jpg';
import performanceJoggers from '@/assets/performance-joggers.jpg';

interface CartItemData {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  quantity: number;
}

const initialItems: CartItemData[] = [
  {
    id: 'dress-001',
    name: 'Golden Shimmery Party Dress',
    category: 'Dresses',
    description: 'Sustainable luxury dress with bio-responsive fabric and ethically sourced materials',
    image: goldenDress,
    quantity: 1,
  },
  {
    id: 'boots-001',
    name: 'Smart Combat Boots',
    category: 'Footwear',
    description: 'Weather-adaptive boots with bio-grip soles and sustainable leather',
    image: smartBoots,
    quantity: 1,
  },
  {
    id: 'joggers-001',
    name: 'Performance Joggers',
    category: 'Activewear',
    description: 'Moisture-wicking joggers made from recycled ocean plastic',
    image: performanceJoggers,
    quantity: 1,
  },
];

export const ShoppingCart: React.FC = () => {
  const [items, setItems] = useState<CartItemData[]>(initialItems);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityChange = (id: string, change: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Future Store</h1>
              <p className="text-sm text-muted-foreground">Sustainable Retail Experience</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 bg-primary/10 px-3 py-2 rounded-lg">
            <CartIcon className="h-5 w-5 text-primary" />
            <span className="font-semibold text-primary">{totalItems} items</span>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-card/50 border-b border-border p-4">
        <div className="flex items-center justify-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">1</span>
            </div>
            <span className="text-primary font-medium">Cart</span>
          </div>
          
          <div className="flex items-center space-x-2 opacity-50">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-muted-foreground">2</span>
            </div>
            <span className="text-muted-foreground">Payment</span>
          </div>
          
          <div className="flex items-center space-x-2 opacity-50">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-muted-foreground">3</span>
            </div>
            <span className="text-muted-foreground">Delivery</span>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-sm mx-auto p-4 space-y-4 min-h-[calc(100vh-200px)]">
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-primary mb-1" />
          </div>
          <h2 className="text-xl font-bold text-primary">Your Shopping Cart</h2>
          <p className="text-muted-foreground text-sm">Sustainable fashion items in your cart</p>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <CartItem
              key={item.id}
              {...item}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12">
            <CartIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        )}
      </div>
    </div>
  );
};