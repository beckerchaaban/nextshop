import React, { useState, useEffect } from 'react';
import { Minus, Plus } from '@phosphor-icons/react';

interface QuantityFieldProps {
    quantity?: number;
    onHandle: (quantity: number) => void;
    small?: boolean;
}

const QuantityField: React.FC<QuantityFieldProps> = ({ quantity = 1, onHandle, small = false }) => {
    const [localQuantity, setLocalQuantity] = useState(quantity);
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
    const debounceDelay = 300; // Adjust the delay as needed

    useEffect(() => {
        setLocalQuantity(quantity);
    }, [quantity]);

    const handleIncrease = () => {
        const newQuantity = localQuantity + 1;
        setLocalQuantity(newQuantity);
        debounceOnHandle(newQuantity);
    };

    const handleDecrease = () => {
        const newQuantity = localQuantity > 1 ? localQuantity - 1 : 1;
        setLocalQuantity(newQuantity);
        debounceOnHandle(newQuantity);
    };

    const debounceOnHandle = (newQuantity: number) => {
        if (debounceTimeout) clearTimeout(debounceTimeout);
        setDebounceTimeout(setTimeout(() => {
            onHandle(newQuantity);
        }, debounceDelay));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const newQuantity = Math.max(1, Number(value) || 1); // Ensure quantity is at least 1
        setLocalQuantity(newQuantity);
        debounceOnHandle(newQuantity);
    };

    return (
        <div className="flex items-center">
            <button 
                onClick={handleDecrease} 
                className={`bg-white rounded-l ${small ? 'p-2' : 'p-6'}`}
            >
                <Minus weight="bold" />
            </button>
            <input
                type="number"
                value={localQuantity}
                onChange={handleInputChange}
                className={`w-12 text-center border border-x-slate-400 border-y-0 focus:outline-none ${small ? 'h-8' : 'h-16'}`}
                style={{
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'textfield',
                } as React.CSSProperties}
            />
            <button 
                onClick={handleIncrease} 
                className={`bg-white rounded-r ${small ? 'p-2' : 'p-6'}`}
            >
                <Plus weight="bold" />
            </button>
        </div>
    );
};

export default QuantityField;