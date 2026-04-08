'use client';

import React from 'react';

export default function PageTitle({ title }) {
  return (
    <div className="flex items-center">
      <h1 className="text-lg font-semibold text-gray-900 m-0">{title}</h1>
    </div>
  );
}

