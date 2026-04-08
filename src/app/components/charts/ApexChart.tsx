'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Load react-apexcharts on client only to avoid "window is not defined"
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

/**
 * ApexChart
 * Lightweight wrapper that fixes common Next.js issues:
 * - SSR: loaded client-side only
 * - Resizing: triggers a reflow when container size changes
 * - Zero-height containers: ensures a sensible default height
 */
export default function ApexChart({
  type = 'area',
  height = 260,
  width = '100%',
  options,
  series,
  className = '',
}) {
  const containerRef = useRef(null);
  const [, setTick] = useState(0);

  // Force a re-render when the container resizes so Apex can recalc dimensions
  useEffect(() => {
    if (!containerRef.current || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => setTick((t) => t + 1));
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const safeOptions = {
    chart: {
      toolbar: { show: false },
      animations: { enabled: true },
      foreColor: '#6b7280',
      ...((options && options.chart) || {}),
    },
    grid: { borderColor: '#eef2ff', ...((options && options.grid) || {}) },
    stroke: { width: 2, curve: 'smooth', ...((options && options.stroke) || {}) },
    dataLabels: { enabled: false, ...((options && options.dataLabels) || {}) },
    tooltip: { theme: 'light', ...((options && options.tooltip) || {}) },
    ...options,
  };

  return (
    <div ref={containerRef} className={className} style={{ minHeight: height }}>
      {typeof window !== 'undefined' && (
        <ReactApexChart type={type} height={height} width={width} options={safeOptions} series={series} />
      )}
    </div>
  );
}

