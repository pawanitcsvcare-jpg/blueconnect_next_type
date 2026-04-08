'use client';

import React from 'react';
import Link from 'next/link';

export default function Breadcrumbs({ items = [] }) {
  if (!items?.length) return null;
  return (
    <nav className="text-xs text-gray-500">
      <ol className="flex items-center gap-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="text-blue-600 hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-600">{item.label}</span>
            )}
            {idx < items.length - 1 && <span className="text-gray-400">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

