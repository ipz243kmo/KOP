import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { DashboardPage } from './pages/DashboardPage';
import { TrackDetailsPage } from './pages/TrackDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.css';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/track/:id" element={<TrackDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}