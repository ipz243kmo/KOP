
import { useState } from 'react';
import './DataTable.css';

export function DataTable({ columns, rows, getRowKey, onRowClick }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortedRows = sortConfig.key
    ? [...rows].sort((a, b) => {
        const { key, direction } = sortConfig;
        const mult = direction === 'asc' ? 1 : -1;
        if (typeof a[key] === 'string') {
          return a[key].localeCompare(b[key]) * mult;
        }
        return (Number(a[key]) - Number(b[key])) * mult;
      })
    : rows;

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getIndicator = (key) => {
    if (sortConfig.key !== key) return ' ↕';
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div className="ds-table-wrap">
      <table className="ds-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={col.width ? { width: col.width } : undefined}>
                {col.sortable ? (
                  <button
                    type="button"
                    className="ds-table__sort-btn"
                    onClick={() => handleSort(col.key)}
                  >
                    {col.label}
                    {getIndicator(col.key)}
                  </button>
                ) : (
                  col.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row) => (
            <tr
              key={getRowKey(row)}
              className={onRowClick ? 'ds-table__row--clickable' : ''}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((col) => (
                <td key={col.key} className={col.cellClassName || ''}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}