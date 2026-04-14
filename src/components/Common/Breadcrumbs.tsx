'use client';

import React from 'react';
import Link from 'next/link';

export type BreadcrumbItem = { label: string; href?: string };

export default function Breadcrumbs({ items = [] }: { items?: BreadcrumbItem[] }) {
  if (!items?.length) return null;
  return (
    <nav className="text-xs text-gray-500 dark:text-slate-400">
      <ol className="flex items-center gap-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            {item.href ? (
              <Link
                href={'#'}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-600 dark:text-slate-300">{item.label}</span>
            )}
            {idx < items.length - 1 && (
              <span className="text-gray-400 dark:text-slate-500">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

