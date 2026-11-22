import { createSlice } from '@reduxjs/toolkit';

function loadInitialFavorites() {
  try {
    const saved = localStorage.getItem('jamendo-favorites');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: loadInitialFavorites(),
  },
  reducers: {
    toggleFavorite(state, action) {
      const track = action.payload;
      const existingIndex = state.items.findIndex((item) => item.id === track.id);

      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(track);
      }

      localStorage.setItem('jamendo-favorites', JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export const selectFavorites = (state) => state.favorites.items;
export const selectFavoriteIds = (state) => state.favorites.items.map((t) => t.id);

export default favoritesSlice.reducer;