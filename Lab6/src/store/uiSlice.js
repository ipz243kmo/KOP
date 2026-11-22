import { createSlice } from '@reduxjs/toolkit';

const initialTheme = localStorage.getItem('jamendo-theme') || 'light';
document.body.dataset.theme = initialTheme;

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: initialTheme,
    chartType: 'bar', 
  },
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('jamendo-theme', state.theme);
      document.body.dataset.theme = state.theme;
    },
    setChartType(state, action) {
      state.chartType = action.payload;
    },
  },
});

export const { toggleTheme, setChartType } = uiSlice.actions;

export const selectTheme = (state) => state.ui.theme;
export const selectChartType = (state) => state.ui.chartType;

export default uiSlice.reducer;