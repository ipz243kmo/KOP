import { MOCK_KPI_STATS, MOCK_TRACKS } from './data/mockTracks';
import { DashboardLayout } from './components/DashboardLayout';
import { KpiCard } from './components/KpiCard';
import { PlaylistStepper } from './components/PlaylistStepper';
import { DisplayToggle } from './components/DisplayToggle';
import { FilteredTrackList } from './components/FilteredTrackList';
import './App.css';

export default function App() {
  return (
    <DashboardLayout
      title="Jamendo Music Analytics"
      subtitle="Каркас аналітичного дашборду (Варіант 1 · Mock Data)"
    >
      {/* Рядок із 3 перевикористовуваними KPI-картками */}
      <div className="kpi-row">
        {MOCK_KPI_STATS.map((stat) => (
          <KpiCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            isPositive={stat.isPositive}
          />
        ))}
      </div>

      {/* Інтерактивні віджети керування станом */}
      <div className="controls-row">
        <PlaylistStepper initialLimit={10} min={5} max={50} />
        <DisplayToggle />
      </div>

      {/* Міні-список треків із фільтром */}
      <FilteredTrackList tracks={MOCK_TRACKS} />
    </DashboardLayout>
  );
}