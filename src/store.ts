import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './reducers/itemsSlice';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
  devTools: true,
});

declare global {
  type RootState = ReturnType<typeof store.getState>;
}
