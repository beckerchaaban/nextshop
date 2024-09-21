import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useNextshopApiDispatch, useNextshopApiSelector } from "../../api";
import { createCartItem } from "../../api/cart";
import { CartItem, CartItemCreate } from "../../interfaces/CartItem";
import QuantityField from "../QuantityField";
import { ArrowRight, CaretRight, Trash, Warehouse, X } from "@phosphor-icons/react";
import Divider from "../Divider";
import { Cart } from "../../interfaces/Cart";

import VisaIcon  from  '../../assets/icons/visa.svg';
import MasterCardIcon  from '../../assets/icons/mastercard.svg';
import KlarnadIcon  from '../../assets/icons/klarna.svg';
interface CartItemProps {
    item: CartItem;
    onRemove: (id: string) => void;
    onUpdateQuantity:(id: string, quantity:number) => void; // Function to handle item removal
}
export interface CheckoutComponentProps{
    cart:Cart
}
const CheckoutComponent = ({cart}:CheckoutComponentProps) =>{

    const handleOnCheckout =() => {}
    return  <div className="flex flex-col gap-8 mt-4 w-2/5">
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-2xl font-bold">Ordersöversikt</h2>
          <Divider />
          <div className="flex items-center justify-between">
            <div className="text-gray-500">Totalt att betala</div>
            <div className="font-bold">
    {cart.totalPrice && cart.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}:-
</div>
          </div>
   <div className="flex gap-4 pt-4">
     <button
       onClick={handleOnCheckout}
       className="bg-blue-600 text-white py-2 px-6 w-full font-semibold text-lg hover:bg-blue-700 h-16 transition rounded flex justify-between items-center"
      
     >
      <span>Betala</span>
      <ArrowRight size={24} />
     </button>
   </div>

 </div>
 <div className="bg-slate-200 p-8">
<p className="text-gray-500">Betalningsalternativ</p>
<div className="flex gap-1">
<VisaIcon  height={24}/>
<MasterCardIcon height={24}/>
<KlarnadIcon height={24}/>
</div>
 </div>
    </div>
    

}
const CartItemComponent: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => {
    return (
        <div className="flex items-center gap-6 p-4 border-b border-slate-400 bg-gray-100">
            <img 
                src={item.imagePath} // Use the image path from the item
                alt=""
                className="w-20 h-20 object-cover border-0" // Adjust size and styling as needed
            />
            <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item.description}</h3>
                <p className="text-sm text-gray-600">{item.characteristics}</p>
                <div className="flex items-center justify-between mt-2">
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-4 items-center">
                            <QuantityField 
                                onHandle={(quantity) => onUpdateQuantity(item.id, quantity)} 
                                quantity={item.quantity} 
                                small
                            />
                            <button
                                onClick={() => onRemove(item.id)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                                aria-label={`Remove ${item.description}`}
                            >
                                <Trash size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <label className="text-xs text-gray-500">Totalt</label>
                <p className="text-lg font-bold">
                    {item.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}:-
                </p>
            </div>
        </div>
    );
};
// Main Cart Page Component
const CartPage: React.FC<{ data: Cart, onRemoveItem: (id: string) => void, onUpdateQuantity: (id: string, quantity: number) => void;  }> = ({ data, onRemoveItem, onUpdateQuantity }) => {

  const dispatch = useNextshopApiDispatch();


  return (<>    <div className="max-w-7xl mx-auto p-4 flex gap-8 w-full">
      <div className="flex flex-col gap-4 mt-4 w-3/5">
      <h2 className="text-2xl font-bold mb-4">Varukorg</h2>
      <div className="flex flex-col">
      {data.cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
            ) : (
                data.cartItems.map(item => (
                    <CartItemComponent key={item.id} item={item} onRemove={onRemoveItem} onUpdateQuantity={onUpdateQuantity} />
                ))
            )}
      </div>
      </div>
      <CheckoutComponent cart={data} />
    </div>
  </>

  );
};

export default CartPage;
