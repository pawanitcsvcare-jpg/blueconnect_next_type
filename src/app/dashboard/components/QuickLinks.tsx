'use client';

import React from 'react';

export default function QuickLinks() {
  return (
    <div className="flex items-center">
      <button type="button" className="rtm-menu-item">
        <span className="plan-icon11">
          <i className="ri-calendar-line" style={{ color: '#f2a23b' }}></i>
        </span>
        <span>Plan</span>
      </button>
      <button type="button" className="rtm-menu-item">
        <i className="ri-gift-line" style={{ color: '#4ca7ef' }}></i>
        <span>Add Inventory</span>
      </button>
      <button type="button" className="rtm-menu-item">
        <i className="ri-git-repository-line" style={{ color: '#4bc6a2' }}></i>
        <span>Inventory Report</span>
      </button>
      <button type="button" className="rtm-menu-item">
        <i className="ri-order-play-fill" style={{ color: '#e46361' }}></i>
        <span>Create New Order</span>
      </button>
      <button type="button" className="rtm-menu-item rtm-dropdown-item">
        <i className="ri-camera-line" style={{ color: '#0ca1b3' }}></i>
        <span>MSISDN Snapshot</span>
      </button>
    </div>
  );
}

