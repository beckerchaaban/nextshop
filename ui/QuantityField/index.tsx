import React, { useState, useEffect } from 'react';
import { Minus, Plus } from '@phosphor-icons/react';

interface QuantityFieldProps {
  quantity?: number;
  onHandle: (quantity: number) => void;
}

const QuantityField: React.FC<QuantityFieldProps> = ({ quantity = 1, onHandle }) => {
  useEffect(() => {
    // Call the onHandle function whenever quantity changes
    onHandle(quantity);
  }, [quantity, onHandle]);

  const handleIncrease = () => {
    onHandle(quantity + 1);
  };

  const handleDecrease = () => {
    onHandle(quantity > 1 ? quantity - 1 : 1);
  };

  return (
    <div className="flex items-center">
      <button onClick={handleDecrease} className="p-4 bg-white rounded-l">
        <Minus weight="bold" />
      </button>
      <input
        type="number"
        value={quantity}
        readOnly
        className="w-12 text-center border border-x-gray-500 border-y-0  h-12"
        style={{
            appearance: 'none',           // Standard property for hiding arrows
            WebkitAppearance: 'none',     // For Chrome/Safari
            MozAppearance: 'textfield',    // For Firefox
          } as React.CSSProperties}
      />
      <button onClick={handleIncrease} className="p-4  bg-white rounded-r">
        <Plus weight="bold" />
      </button>
    </div>
  );
};

export default QuantityField;