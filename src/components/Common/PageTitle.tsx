'use client';

import React from 'react';

export default function PageTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center">
      <h1 className="m-0 text-lg font-semibold text-gray-900 dark:text-slate-100">
        {title}
      </h1>
    </div>
  );
}

