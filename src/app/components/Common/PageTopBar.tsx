'use client';

import React from 'react';
import PageTitle from './PageTitle';
import Breadcrumbs from './Breadcrumbs';

interface PageTopBarProps {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
  right?: React.ReactNode;
}
export default function PageTopBar({ title, breadcrumbs = [] as unknown as { label: string; href?: string }[], right }: PageTopBarProps) {
  return (
    <div className="w-full mb-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <PageTitle title={title} />
          <div className="mt-1">
            <Breadcrumbs items={breadcrumbs as never[]} />
          </div>
        </div>
        {
          right && (
            <div className="flex items-center gap-2">
              {right}
            </div>
          )
        }
      </div>
    </div>
  );
}

