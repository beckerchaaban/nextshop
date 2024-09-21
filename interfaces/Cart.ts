import { CartItem } from "./CartItem";

export interface Cart {
    id: string;
    sessionId: string;
    createdAt: string;
    quantity: number;
    payerName?: string;
    payerTelephone?: string;
    payerEmail?: string;
    deliveryAddress?: string;
    deliveryCity?: string;
    deliveryPostCode?: string;
    totalPrice:number;
    cartItems: CartItem[];
}

export interface CartCreate {}