'use client';

import React from 'react';
import PageTitle from './PageTitle';
import DashboardSwitch from './DashboardSwitch';
import QuickLinks from './QuickLinks';

export default function DashboardHeader() {
  return (
    <div className="rtm-nav-shell">
      <div className="rtm-nav-track">
        <PageTitle />
        <div className="rtm-nav-track-content">
          <DashboardSwitch />
          <QuickLinks />
        </div>
      </div>
    </div>
  );
}

