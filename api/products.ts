
import { client } from './client';
import { AppThunkAction } from '.';
import { Action, createAsyncThunk, Reducer } from '@reduxjs/toolkit';
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
  inventories:[],
  variants:[],
  images:[]
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
export const getProducts = createAsyncThunk<Product[], { category: string; subCategories: string[]|undefined }>(
  'products/getProducts',
  async ({ category, subCategories }) => {
    const response = await client.get(`/products/${category}?subCategories=${subCategories && subCategories?.join(',')}`) as _ResultResponse<Product[]>;
    return response.result ?? [];
  }
);

export const getSubProducts = createAsyncThunk<Product[] | undefined, string>(
  'products/getsSubProducts',
  async (url: string, { rejectWithValue }) => {
    try {
      const response = await client.get(`/products/getSub//${url}`) as _ResultResponse<Product[]>;
      return response.result ?? undefined; // Return the category or undefined
    } catch (error) {
      console.error('Error fetching category:', error);
      return rejectWithValue(error); // Handle errors
    }
  }
);


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