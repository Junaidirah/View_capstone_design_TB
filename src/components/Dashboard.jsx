import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://server-capstone-design-tb-sgnp.vercel.app/api/data/all')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(json => {
        setData(Array.isArray(json) ? json : [json]);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-layout">
      {/* Sidebar kiri */}
      <nav className="sidebar-left" aria-label="Main menu">
        <ul className="menu">
          <li className="active" title="Dashboard">
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg> Dashboard
          </li>
          <li title="Notification">
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /></svg> Notification
          </li>
          <li title="Settings">
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51z" /></svg> Settings
          </li>
        </ul>
        <div className="logout" title="Log out">
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /></svg>
          Log out
        </div>
      </nav>

      {/* Konten utama */}
      <main className="main-content">
        <header className="header">
          <h1>Dashboard</h1>
          <div className="search-bar">
            <input type="search" placeholder="Search" aria-label="Search data..." />
          </div>
          <button className="bell" aria-label="Notifications">
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /></svg>
          </button>
        </header>

        <table className="dashboard-table" aria-label="Data table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Volume</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', color: '#999' }}>
                  Loading data...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', color: 'red' }}>
                  Error: {error}
                </td>
              </tr>
            )}
            {!loading && !error && data && data.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', color: '#999' }}>
                  No data available
                </td>
              </tr>
            )}
            {!loading && !error && data && data.map((item, i) => {
              const dateObj = new Date(item.time);
              const date = dateObj.toISOString().slice(0, 10);
              const time = dateObj.toTimeString().slice(0, 5);
              return (
                <tr key={i}>
                  <td>{date}</td>
                  <td>{time}</td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                  <td>{item.volume}</td>
                  <td>{item.unit || 'ml'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>

      {/* Sidebar kanan profil */}
      <aside className="sidebar-right" aria-label="User Profile">
        <img
          className="profile-img"
          src="/profile.jpg"
          alt="Profile picture"
        />
        <div className="profile-name">Aqilah Nasywa A.S</div>
        <div className="profile-role">Doctor</div>
      </aside>
    </div>
  );
}

export default Dashboard;
