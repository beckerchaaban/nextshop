import { client } from "./client";
import { AppThunkAction } from ".";
import { Action, Reducer } from "@reduxjs/toolkit";
import { Product } from "../interfaces/Product";
import { Cart, CartCreate } from "../interfaces/Cart";
import { _ResultResponse } from "../interfaces/_ResultResponse";
import { CartItem, CartItemCreate } from "../interfaces/CartItem";
import { stat } from "fs";
export interface CartState {
  Cart: Cart;
  CartItem: CartItem;
}

interface ActionCart {
  type: "api/getCart";
  cart: Cart;
}
interface ActionAddCartItem {
  type: "api/addCartItem";
  cartItem: CartItem;
}

interface ActionUpdateCartItem {
  type: "api/updateCartItem";
  cartItem: CartItem;
}
interface ActionRemoveCartItem {
  type: "api/removeCartItem";
  cartItem: CartItem;
}

interface ActionCartCreate {
  type: "api/createCart";
  Cart: CartCreate;
}

export const defaultCart: Cart = {
  cartItems: [],
  createdAt: "",
  id: "",
  quantity: 0,
  sessionId: "",
  deliveryAddress: "",
  deliveryCity: "",
  deliveryPostCode: "",
  payerEmail: "",
  payerName: "",
  payerTelephone: "",
};
const defaultCartItem: CartItem = {
  cartId: "",
  quantity: 0,
  productId: "",
  characteristics: "",
  createdAt: "",
  description: "",
  id: "",
  totalPrice: 0,
  unitPrice: 0,
};
// Initial state
const initialState: CartState = {
  Cart: defaultCart,
  CartItem: defaultCartItem,
};

type KnownAction =
  | ActionCart
  | ActionCartCreate
  | ActionAddCartItem
  | ActionUpdateCartItem
  | ActionRemoveCartItem;

// Reducer function
export const reducer: Reducer<CartState> = (
  state: CartState | undefined,
  incomingAction: Action
): CartState => {
  if (state === undefined) {
    return initialState;
  }
  const action = incomingAction as KnownAction;

  switch (action.type) {
    case "api/getCart":
      return { ...state, Cart: action.cart };
    case "api/addCartItem":
      return { ...state, CartItem: action.cartItem };

    case "api/updateCartItem":
      return {
        ...state,
        Cart: {
          ...state.Cart,
          cartItems: [
            ...state.Cart.cartItems.map((cartItem) =>
              cartItem.id === action.cartItem.id ? action.cartItem : cartItem
            ),
          ],
        },
      };
    case "api/removeCartItem":
      return {
        ...state,
        Cart: {
          ...state.Cart,
          cartItems: [
            ...state.Cart.cartItems.filter(
              (cartItem) => cartItem.id !== action.cartItem.id
            ),
          ],
        },
      };
    default:
      return state;
  }
};

// Thunk function to sfetch all products
export const getCart = (): AppThunkAction<KnownAction> => {
  return async (dispatch, getState) => {
    try {
      const response = (await client.get("/cart")) as _ResultResponse<Cart>;
      response.result &&
        dispatch({ type: "api/getCart", cart: response.result });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
};

// Thunk function to fetch a single product by ID
export const createCartItem = (
  cartItem: CartItemCreate
): AppThunkAction<KnownAction> => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const response = (await client.post(
        `/cart/item`,
        cartItem
      )) as _ResultResponse<Cart>;
      console.log("response", response);
      response.result &&
        dispatch({ type: "api/getCart", cart: response.result });
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
};

export const updateCartItem = (
  cartItemId: string,
  field: keyof CartItem,
  value: any
): AppThunkAction<KnownAction> => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const response = (await client.put(`/cart/item/${cartItemId}`, {
        field,
        value,
      })) as _ResultResponse<CartItem>;
      if (response.isValid && response.result) {
        dispatch({
          type: "api/getCart",
          cart: {
            ...state.cart.Cart,
            cartItems: state.cart.Cart.cartItems.map((x) =>
              x.id === cartItemId ? response.result ?? defaultCartItem : x
            ),
          },
        });
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };
};

export const removeCartItem = (
  cartItemId: string
): AppThunkAction<KnownAction> => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const response = (await client.delete(
        `/cart/item/${cartItemId}`
      )) as _ResultResponse<null>;
      response.isValid &&
        dispatch({
          type: "api/getCart",
          cart: {
            ...state.cart.Cart,
            cartItems: state.cart.Cart.cartItems.filter(
              (x) => x.id !== cartItemId
            ),
          },
        });
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
};
