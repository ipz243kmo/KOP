import { createSlice } from '@reduxjs/toolkit';

export const DEFAULT_FILTERS = {
  search: '',
  genre: '',
  order: 'popularity_total',
  limit: 15,
  onlyFavorites: false,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: DEFAULT_FILTERS,
  reducers: {
    updateFilters(state, action) {
      return { ...state, ...action.payload };
    },
    toggleOnlyFavorites(state) {
      state.onlyFavorites = !state.onlyFavorites;
    },
    resetFilters() {
      return DEFAULT_FILTERS;
    },
  },
});

export const { updateFilters, toggleOnlyFavorites, resetFilters } = filtersSlice.actions;

export const selectFilters = (state) => state.filters;

export default filtersSlice.reducer;