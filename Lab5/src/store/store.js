import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filtersSlice';
import favoritesReducer from './favoritesSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    favorites: favoritesReducer,
    ui: uiReducer,
  },
});