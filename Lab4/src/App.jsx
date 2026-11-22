import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FiltersProvider } from './context/FiltersContext';
import { DashboardPage } from './pages/DashboardPage';
import { TrackDetailsPage } from './pages/TrackDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.css';

export default function App() {
  return (
    <ThemeProvider>
      <FiltersProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/track/:id" element={<TrackDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </FiltersProvider>
    </ThemeProvider>
  );
}