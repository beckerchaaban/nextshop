import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useNextshopApiDispatch, useNextshopApiSelector } from "../../api";
import { createCartItem } from "../../api/cart";
import { CartItem, CartItemCreate } from "../../interfaces/CartItem";
import QuantityField from "../QuantityField";
import {
  ArrowRight,
  CaretRight,
  Check,
  LockKey,
  Trash,
  UserPlus,
  Warehouse,
  X,
} from "@phosphor-icons/react";
import Divider from "../Divider";
import { Cart } from "../../interfaces/Cart";
import { useParams } from "next/navigation";
import TextBox from "../../ui/TextBox";
import CheckBox from "../../ui/CheckBox";

interface CartItemProps {
  item: CartItem;
}
export interface CheckoutComponentProps {
  cart: Cart;
}
export interface CheckoutParams {
  type?: "newCustomer" | "login"
}

type stepType = "delivery" | "details" | "payment";
type DeliveryOption = {
  id: string;
  label: string;
  price: number;
};
const CheckedMark = () => {
  return (
      <div className="flex items-center justify-center w-8 h-8 bg-green-200 rounded-full text-green-700">
          <Check size={16} />
      </div>
  );
};


const deliveryOptions: DeliveryOption[] = [
  { id: 'standard', label: 'Standard Delivery', price: 5 },
  { id: 'express', label: 'Express Delivery', price: 15 },
  { id: 'next-day', label: 'Next-Day Delivery', price: 25 },
];
const DeliveryOptions = () => {
  const [selectedOption, setSelectedOption] = useState<string>(deliveryOptions[0].id);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedOption(event.target.value);
  };

  return (
      <div className="p-8 bg-gray-100">
          <h2 className="text-lg font-bold mb-4">Leveransalternativ</h2>
          <div className="flex flex-col gap-4">
              {deliveryOptions.map(option => (
                  <label key={option.id} className="flex items-center">
                      <input
                          type="radio"
                          name="delivery"
                          value={option.id}
                          checked={selectedOption === option.id}
                          onChange={handleOptionChange}
                          className="mr-2"
                      />
                      <span className="text-gray-700">{option.label} - ${option.price}</span>
                  </label>
              ))}
          </div>
          <div className="mt-4">
              <p className="font-semibold">
                 Vald {deliveryOptions.find(option => option.id === selectedOption)?.label}
              </p>
          </div>
      </div>
  );
};
const CheckoutSteps = () => {
  const [openSteps, setOpenSteps] = useState<stepType[]>(["details"]);
  const [completedSteps, setCompletedSteps] = useState<stepType[]>([]);
  const[isSameAsAddress, setIsSameAsAddress] = useState(true);
  const { type } = useParams() as CheckoutParams;

  const completeDetails = () => {
      if (!completedSteps.includes("details")) {
          setCompletedSteps(prev => [...prev, "details"]);
      }
      if (!openSteps.includes("delivery")) {
          setOpenSteps(prev => [...prev, "delivery"]);
      }
  };

  const completeDelivery = () => {
      if (!completedSteps.includes("delivery")) {
          setCompletedSteps(prev => [...prev, "delivery"]);
      }
      if (!openSteps.includes("payment")) {
          setOpenSteps(prev => [...prev, "payment"]);
      }
  };

  const handleChangeStep = (step: stepType) => {
    // Remove the specific step from completedSteps
    setCompletedSteps(prev => prev.filter(s => s !== step));
    
    // Update openSteps to include the step being changed
    setOpenSteps(prev => {
        // If the step is already open, return the current state
        if (prev.includes(step)) {
            return prev;
        }
        // Otherwise, return the new state with the step included
        return [...prev, step];
    });
};

  return (
      <div className="flex flex-col gap-4 mt-4 w-3/5">
          {/* Details Step */}
          <div className="flex flex-col gap-4 p-8 border border-slate-400">
              <h1 className={`font-bold flex gap-4 items-center ${openSteps.includes("details") ? "text-black" : "text-slate-400"}`}>
              {completedSteps.includes("details") && <CheckedMark />}<span>Dina uppgifter</span>
              </h1>
              {completedSteps.includes("details") && (
                  <button className="underline text-sm" onClick={() => handleChangeStep("details")}>
                      Ändra
                  </button>
              )}
              {openSteps.includes("details") && !completedSteps.includes("details") && (
                  <div className="flex flex-col gap-4">
                      <TextBox label="E-postadress" />
                      <h2 className="font-bold text-black">Leveransadress</h2>
                      <div className="flex gap-4 items-center w-full">
                          <TextBox label="Förnamn" />
                          <TextBox label="Efternamn" />
                      </div>
                      <div className="flex gap-4 items-center w-full">
                          <TextBox label="Gatoadress" />
                      </div>
                      <div className="flex gap-4 items-center w-full">
                          <TextBox label="Postnummer" />
                          <TextBox label="Ort" />
                      </div>
                      <div className="flex gap-4 items-center w-full">
                          <CheckBox onChange={setIsSameAsAddress} checked={isSameAsAddress} label="Faktureringsadressen är samma som leveransadressen" />
                      </div>
                      {!isSameAsAddress && <div className="flex flex-col gap-4">
                        <Divider />
                        <h2 className="font-bold text-black">Faktureringsadress</h2>
                      <div className="flex gap-4 items-center w-full">
                          <TextBox label="Förnamn" />
                          <TextBox label="Efternamn" />
                      </div>
                      <div className="flex gap-4 items-center w-full">
                          <TextBox label="Gatoadress" />
                      </div>
                      <div className="flex gap-4 items-center w-full">
                          <TextBox label="Postnummer" />
                          <TextBox label="Ort" />
                      </div>
                        </div>}
                      <button
                          onClick={completeDetails}
                          className="bg-blue-600 text-white py-2 px-6 w-full font-semibold text-lg hover:bg-blue-700 h-16 transition rounded flex justify-between items-center"
                      >
                          <span>Fortsätt</span>
                          <ArrowRight size={24} />
                      </button>
                  </div>
              )}

          </div>

          {/* Delivery Step */}
          <div className="flex flex-col gap-4 p-8 border border-slate-400">
              <h2 className={`font-bold flex gap-4 items-center ${openSteps.includes("delivery") ? "text-black" : "text-slate-400"}`}>
                  {completedSteps.includes("delivery") && <CheckedMark />}<span>Leverans</span>
              </h2>
              {completedSteps.includes("delivery") && (
                  <button className="underline text-sm" onClick={() => handleChangeStep("delivery")}>
                      Ändra
                  </button>
              )}
              {openSteps.includes("delivery") && !completedSteps.includes("delivery") && (
                  <div className="flex flex-col gap-4">
                     <div className="flex gap-4 items-center w-full">
                          <TextBox label="Postnummer" />
                      </div>
                      <DeliveryOptions />
                      <button
                          onClick={completeDelivery}
                          className="bg-blue-600 text-white py-2 px-6 w-full font-semibold text-lg hover:bg-blue-700 h-16 transition rounded flex justify-between items-center"
                      >
                          <span>Fortsätt</span>
                          <ArrowRight size={24} />
                      </button>
                  </div>
              )}
              

          </div>

          {/* Payment Step */}
          <div className="flex flex-col gap-4 p-8 border border-slate-400">
              <h2 className={`font-bold flex gap-4 items-center ${openSteps.includes("payment") ? "text-black" : "text-slate-400"}`}>
                  {completedSteps.includes("payment") && <CheckedMark />}<span>Betalning</span>
              </h2>
              {openSteps.includes("payment") && !completedSteps.includes("payment") && (
                  <div>
                      <button className="bg-blue-600 text-white py-2 px-6 w-full font-semibold text-lg hover:bg-blue-700 h-16 transition rounded flex justify-between items-center">
                          <span>Betala</span>
                          <ArrowRight size={24} />
                      </button>
                  </div>
              )}
          </div>
      </div>
  );
};
const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  return (
    <div className="flex items-center gap-6 p-4 border-b border-slate-400">
      <div className="flex-grow">
        <h3 className="text-base">{item.description}</h3>
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col gap-1">
            <div className="flex gap-4 items-center text-gray-500">
              {item.unitPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              x {item.quantity}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <label className="text-xs text-gray-500">Totalt</label>
        <p className="text-base font-bold text-gray-500">
          {item.totalPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          :-
        </p>
      </div>
    </div>
  );
};
// Main Cart Page Component
const CheckoutPage: React.FC<{
  data: Cart;
}> = ({ data }) => {
  const dispatch = useNextshopApiDispatch();

  return (
    <>
      {" "}
      <div className="max-w-7xl mx-auto p-2 flex gap-4 w-full">
        <CheckoutSteps />
        <div className="flex flex-col gap-4 mt-4 w-2/5 bg-slate-200 p-8">
          <h2 className="text-xl font-bold">Ordersöversikt</h2>
          <div className="flex flex-col">
            {data.cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              data.cartItems.map((item) => (
                <CartItemComponent key={item.id} item={item} />
              ))
            )}
          </div>
          <div className="flex justify-between border-b border-slate-400 py-2">
            <span>Artiklar</span>
            {data.totalPrice && (
              <span className="font-bold">
                {data.totalPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                :-
              </span>
            )}
          </div>
          <div className="flex justify-between py-2">
            <span>Leverans</span>
            {data.totalPrice && (
              <span className="font-bold">
                {data.totalPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                :-
              </span>
            )}
          </div>
          <div className="flex justify-between text-xl font-bold border-t-2 border-slate-400 py-4">
            <span>Totalpris</span>
            {data.totalPrice &&
              data.totalPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            :-
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
