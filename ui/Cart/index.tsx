import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useNextshopApiDispatch, useNextshopApiSelector } from "../../api";
import { createCartItem } from "../../api/cart";
import { CartItem, CartItemCreate } from "../../interfaces/CartItem";
import QuantityField from "../QuantityField";
import { CaretRight, Trash, Warehouse, X } from "@phosphor-icons/react";
import Divider from "../Divider";
import { Cart } from "../../interfaces/Cart";


interface CartItemProps {
    item: CartItem;
    onRemove: (id: string) => void;
    onUpdateQuantity:(id: string, quantity:number) => void; // Function to handle item removal
}

const CartItemComponent: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => {
    return (
        <div className="flex items-center gap-6 p-4 bg-slate-200 rounded-lg shadow-md">
            <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item.description}</h3>
                <p className="text-sm text-gray-600">{item.characteristics}</p>
                <div className="flex items-center justify-between mt-2">
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-500" htmlFor={`quantity-${item.id}`}>Quantity</label>
                        <QuantityField 
                            onHandle={(quantity) => onUpdateQuantity(item.id, quantity)} 
                            quantity={item.quantity} 
                        />
                    </div>
                    <button
                        onClick={() => onRemove(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        aria-label={`Remove ${item.description}`}
                    >
                        <Trash size={20} />
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <label className="text-xs text-gray-500">Total Price</label>
                <p className="text-lg font-bold">{item.totalPrice.toFixed(2)}</p>
            </div>
        </div>
    );
};
// Main Cart Page Component
const CartPage: React.FC<{ data: Cart, onRemoveItem: (id: string) => void, onUpdateQuantity: (id: string, quantity: number) => void;  }> = ({ data, onRemoveItem, onUpdateQuantity }) => {

  const dispatch = useNextshopApiDispatch();


  return (
    <div className="max-w-7xl mx-auto p-4 flex gap-4 w-full">
      <div className="flex flex-col gap-4 mt-4 w-3/5">
      <h2 className="text-2xl font-bold mb-4">Varukorg</h2>
            {data.cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
            ) : (
                data.cartItems.map(item => (
                    <CartItemComponent key={item.id} item={item} onRemove={onRemoveItem} onUpdateQuantity={onUpdateQuantity} />
                ))
            )}
      </div>
      <div className="flex flex-col gap-4 mt-4 w-2/5">
        check out
      </div>
    </div>
  );
};

export default CartPage;
