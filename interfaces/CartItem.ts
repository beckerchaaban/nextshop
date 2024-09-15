export interface CartItem {
    id: string;
    cartId: string;
    productId: string;
    description: string;
    characteristics: string;
    unitPrice: number;
    totalPrice: number;
    quantity: number;
    createdAt: string;
}
export interface CartItemCreate {
    productId: string;
    quantity: number;
    selectedVariants:string[];
}