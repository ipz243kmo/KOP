import { useSelector, useDispatch } from 'react-redux';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { selectChartType, setChartType, selectTheme } from '../store/uiSlice';
import { Card, Button } from '../design-system';

function aggregateByGenre(tracks) {
  const map = tracks.reduce((acc, track) => {
    const genre = track.genre || 'Інше';
    if (!acc[genre]) {
      acc[genre] = { genre, count: 0, totalMinutes: 0 };
    }
    acc[genre].count += 1;
    acc[genre].totalMinutes += Number((track.duration / 60).toFixed(1));
    return acc;
  }, {});

  return Object.values(map).sort((a, b) => b.count - a.count);
}

export function AnalyticsChart({ tracks }) {
  const dispatch = useDispatch();
  const chartType = useSelector(selectChartType);
  const theme = useSelector(selectTheme);

  const chartData = aggregateByGenre(tracks);
  const axisColor = theme === 'dark' ? '#94a3b8' : '#475569';
  const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0';

  if (chartData.length === 0) {
    return null;
  }

  return (
    <Card as="section">
      <div className="section-header">
        <div>
          <h3>Розподіл треків та тривалості за жанрами</h3>
          <span className="hint-text">
            Візуалізація реактивно оновлюється відповідно до активних фільтрів
          </span>
        </div>

        <div className="button-group" role="group" aria-label="Тип графіка">
          <Button
            variant={chartType === 'bar' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => dispatch(setChartType('bar'))}
          >
            📊 Стовпчиковий
          </Button>
          <Button
            variant={chartType === 'line' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => dispatch(setChartType('line'))}
          >
            📈 Лінійний
          </Button>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={290}>
          {chartType === 'bar' ? (
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="genre" stroke={axisColor} />
              <YAxis stroke={axisColor} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-primary)',
                }}
              />
              <Legend />
              <Bar dataKey="count" name="Кількість треків" fill="var(--palette-blue-500)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="totalMinutes" name="Тривалість (хв)" fill="var(--palette-emerald-500)" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="genre" stroke={axisColor} />
              <YAxis stroke={axisColor} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-primary)',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="count" name="Кількість треків" stroke="var(--palette-blue-500)" strokeWidth={3} dot={{ r: 5 }} />
              <Line type="monotone" dataKey="totalMinutes" name="Тривалість (хв)" stroke="var(--palette-emerald-500)" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
}