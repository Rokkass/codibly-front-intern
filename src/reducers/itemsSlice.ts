import { createSlice } from '@reduxjs/toolkit';

interface Item {
  id: number;
  color: string;
  name: string;
  pantone_value: string;
  year: number;
}

const initialState: Item[] = [];

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    handleFetchData: (state, action) => {
      return [...action.payload];
    },
  },
});

export default itemsSlice.reducer;

export const { handleFetchData } = itemsSlice.actions;
