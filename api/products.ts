
import { client } from './client';
import { AppThunkAction } from '.';
import { Action, Reducer } from '@reduxjs/toolkit';
import { Product } from '../interfaces/Product';
import { _ResultResponse } from '../interfaces/_ResultResponse';
export interface ProductsState {
  Products: Product[];
  Product: Product;
}

interface ActionProducts {
  type: 'api/getProducts';
  products: Product[];
}

interface ActionProduct {
  type: 'api/getProduct';
  product: Product;
}

export const defaultProduct: Product = {
  createdAt: '',
  createdBy: '',
  id: '',
  InventoryId: '',
  inventoryId: '',
  isPurchasable: false,
  price: 0,
  productTypeId: '',
  supplierId: '',
  unitId: '',
  vatId: '',
  description: '',
  externalId: '',
  imgAlt: '',
  imgUrl: '',
  name: '',
  ocrNumber: 0,
  sku: '',
};

// Initial state
const initialState: ProductsState = {
  Products: [],
  Product: defaultProduct,
};

type KnownAction = ActionProducts | ActionProduct;

// Reducer function
export const reducer: Reducer<ProductsState> = (state: ProductsState | undefined, incomingAction: Action): ProductsState => {
  if (state === undefined) {
    return initialState;
  }
  const action = incomingAction as KnownAction;
  
  switch (action.type) {
    case 'api/getProducts':
      return { ...state, Products: action.products };
    case 'api/getProduct':
      return { ...state, Product: action.product };
    default:
      return state;
  }
};

// Thunk function to fetch all products
export const getProducts = (): AppThunkAction<KnownAction> => {
  return async (dispatch, getState) => {
    try {
      const response = await client.get('/products/')  as _ResultResponse<Product[]>;
      dispatch({ type: 'api/getProducts', products: response.result ?? [] }); 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
};

// Thunk function to fetch a single product by ID
export const getProduct = (productId: string): AppThunkAction<KnownAction> => {
  return async (dispatch, getState) => {
    try {
      const response = await client.get(`/product/${productId}`) as _ResultResponse<Product>;
      console.log('response',response);
      dispatch({ type: 'api/getProduct', product: response.result ?? defaultProduct });
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };
};