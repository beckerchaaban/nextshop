
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import * as Products from './products';
import * as Cart from './cart';
import * as Dropdown from './dropdown';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        products: Products.reducer,
        cart: Cart.reducer,
        dropdown: Dropdown.reducer
    }})

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => NextshopApiState): void;
}
export type nextshopApiDispatch = typeof store.dispatch;
export type NextshopApiState = ReturnType<typeof store.getState>;
export const useNextshopApiSelector: TypedUseSelectorHook<NextshopApiState> = useSelector;
export const useNextshopApiDispatch = () => useDispatch<nextshopApiDispatch>();