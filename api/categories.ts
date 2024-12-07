
import { client } from './client';
import { AppThunkAction } from '.';
import { Action, createAsyncThunk, Reducer } from '@reduxjs/toolkit';
import { Category } from '../interfaces/Category';
import { _ResultResponse } from '../interfaces/_ResultResponse';

export interface CategoriesState {
  Categories: Category[];
  Category: Category;
}

interface ActionCategories {
  type: 'api/getCategories';
  categories: Category[];
}

interface ActionCategory {
  type: 'api/getCategory';
  category: Category;
}

export const defaultCategory: Category = {
  createdAt:'',
  createdBy:'',
  description:'',
  url:'',
  id:'',
  lastModifiedAt:'',
  modifiedBy:'',
  name:'',
  sortOrder:0,
  parentId:'',
  subCategories:[]
};

// Initial state
const initialState: CategoriesState = {
  Categories: [],
  Category: defaultCategory,
};

type KnownAction = ActionCategories | ActionCategory;

// Reducer function
export const reducer: Reducer<CategoriesState> = (state: CategoriesState | undefined, incomingAction: Action): CategoriesState => {
  if (state === undefined) {
    return initialState;
  }
  const action = incomingAction as KnownAction;
  
  switch (action.type) {
    case 'api/getCategories':
      return { ...state, Categories: action.categories };
    case 'api/getCategory':
      return { ...state, Category: action.category };
    default:
      return state;
  }
};

// Thunk function to fetch all categories
export const getCategories = (): AppThunkAction<KnownAction> => {
  return async (dispatch, getState) => {
    try {
      const response = await client.get('/category')  as _ResultResponse<Category[]>;
      dispatch({ type: 'api/getCategories', categories: response.result ?? [] }); 
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
};

// Thunk function to fetch a single category by ID
export const getCategory = (categoryId: string): AppThunkAction<KnownAction> => {
  return async (dispatch, getState) => {
    try {
      const response = await client.get(`/category/${categoryId}`) as _ResultResponse<Category>;
      console.log('response',response);
      dispatch({ type: 'api/getCategory', category: response.result ?? defaultCategory });
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };
};

export const getCategoryByUrl = createAsyncThunk<Category | undefined, string>(
  'category/getByUrl',
  async (url: string, { rejectWithValue }) => {
    try {
      const response = await client.get(`/category/ByUrl/${url}`) as _ResultResponse<Category>;
      return response.result ?? undefined; // Return the category or undefined
    } catch (error) {
      console.error('Error fetching category:', error);
      return rejectWithValue(error); // Handle errors
    }
  }
);