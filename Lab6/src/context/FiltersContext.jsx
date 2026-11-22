import { createContext, useContext, useState, useCallback } from 'react';

export const DEFAULT_FILTERS = {
  search: '',
  genre: '',
  order: 'popularity_total',
  limit: 15,
};

const FiltersContext = createContext(null);

export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const updateFilters = useCallback((newValues) => {
    setFilters((prev) => ({ ...prev, ...newValues }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  return (
    <FiltersContext.Provider value={{ filters, updateFilters, resetFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters має використовуватися всередині FiltersProvider');
  }
  return context;
}