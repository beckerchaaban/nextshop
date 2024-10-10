import { Action, Reducer } from "redux";
import { AppThunkAction } from "./index";
import { _ResultResponse } from "interfaces/_ResultResponse";
import { Country } from "interfaces/Country";
import { Unit } from "interfaces/Unit";
import { client } from "./client";

// State interface defining the structure of dropdown data.
export interface DropdownState {
  Countries: _DropdownType<Country[], 'Countries'>;
  Units: _DropdownType<Unit[], 'Units'>;
}

// Action interface for requesting dropdown data.
export interface RequestDropdownsAction {
  type: "REQUEST_Dropdowns";
  Countries: Country[];
  Units: Unit[];
}

export type DropdownType = 'Countries' | 'Units';

export interface _DropdownType<T, DropdownType> {
  type: DropdownType;
  dropdown: T;
}

type KnownAction = RequestDropdownsAction;

// Action creators for fetching dropdown data.
export const getDropdowns = (dropdownsToFetch: DropdownType[], options?: string):  AppThunkAction<KnownAction> => {
    return async (dispatch, getState) => {
        try {
    const appState = getState();
console.log('dropdown state',appState?.dropdown)
    if (appState?.dropdown) {
      // Create a mapping of dropdown names to their state properties
      const dropdownMapping = {
        Countries: appState.dropdown.Countries,
        Units: appState.dropdown.Units,
      };

      // Filter dropdowns that need to be fetched
      const filterDropdownToGet = dropdownsToFetch.filter((dropdown) => {
        const dropdownState = dropdownMapping[dropdown];
        return dropdownState.dropdown.length === 0; // Check if the dropdown is empty
      });
console.log('filterDropdownToGet',filterDropdownToGet);
      if (filterDropdownToGet.length > 0) {
        const response = await client.get(`/dropdown/${filterDropdownToGet.join("|")}${options ? "/" + options : ""}`)  as _ResultResponse<{
            countries: Country[];
            units: Unit[];
          }>;

console.log('result',response);
            if (response.isValid) {
              dispatch({
                type: "REQUEST_Dropdowns",
                Countries: response.result?.countries ?? [],
                Units: response.result?.units ?? [],
              });
            }
          }
    }
    }  catch (error) {
        console.error('Error fetching products:', error);
      }
    }
};

// Initial state for the dropdown data.
const initialState: DropdownState = {
  Countries: { dropdown: [], type: "Countries" },
  Units: { dropdown: [], type: "Units" },
};

// Reducer for handling dropdown state.
export const reducer: Reducer<DropdownState> = (state: DropdownState | undefined, incomingAction: Action): DropdownState => {
  if (state === undefined) {
    return initialState;
  }
  
  const action = incomingAction as KnownAction;

  switch (action.type) {
    case "REQUEST_Dropdowns":
      return {
        Countries: {
          ...state.Countries,
          dropdown: action.Countries.length > 0 ? action.Countries : state.Countries.dropdown,
        },
        Units: {
          ...state.Units,
          dropdown: action.Units.length > 0 ? action.Units : state.Units.dropdown,
        },
      };
    default:
      return state;
  }
};