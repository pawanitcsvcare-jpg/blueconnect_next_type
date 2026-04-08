'use client';

import React, { useState } from 'react';

export default function DashboardSwitch() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="rtm-chip-group">
      <span className="rtm-master-label">Master Dashboard</span>
      <label className="dashboard-toggle-wrap" htmlFor="dashboardToggleReact">
        <input
          id="dashboardToggleReact"
          type="checkbox"
          className="dashboard-toggle-input"
          checked={enabled}
          onChange={() => setEnabled(v => !v)}
        />
        <span className="dashboard-toggle-slider" aria-hidden="true"></span>
        <span className="dashboard-toggle-text">Dashboard</span>
      </label>
    </div>
  );
}
