export function DashboardLayout({ title, subtitle, children }) {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>{title}</h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </header>
      <main className="dashboard-grid">{children}</main>
    </div>
  );
}