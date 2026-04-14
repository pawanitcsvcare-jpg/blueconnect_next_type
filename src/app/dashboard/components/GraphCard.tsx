'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { ApexOptions } from 'apexcharts';
import ApexChart from '@/components/charts/ApexChart';

type GraphCardProps = {
  title: string;
  imageWidth?: string;
  imageSrc: string;
  imageAlt: string;
  ctaHref?: string;
  ctaLabel?: string;
  ctaIconClass?: string;
  chartType?: React.ComponentProps<typeof ApexChart>['type'];
  chartOptions?: ApexOptions;
  chartSeries?: ApexOptions['series'];
  chartHeight?: number;
};

export default function GraphCard({
  title,
  imageWidth,
  imageSrc,
  imageAlt,
  ctaHref = '#',
  ctaLabel = 'Click to View',
  ctaIconClass = 'ri-bar-chart-line',
  chartType,
  chartOptions,
  chartSeries,
  chartHeight,
}: GraphCardProps) {
  const [showChart, setShowChart] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (chartOptions && chartSeries) {
      setShowChart(true);
    }
  };

  return (
    <div className="card mb-0">
      <h5 className="card-header">{title}</h5>
      <div className="card-body pt-0">
        <div className={`${showChart ? 'allda-dahboard-chart' : 'dashboard-bottom-graph-section-item_click_section'}`}>
          {showChart && chartOptions && chartSeries ? (
            <ApexChart
              type={chartType || 'area'}
              height={chartHeight || 260}
              options={chartOptions}
              series={chartSeries}
              className=""
            />
          ) : (
            <div className="dashboardimg1section flex items-center justify-center">
              <img src={imageSrc} alt={imageAlt} className={`dashboardimg1section_img ${imageWidth ? imageWidth : ''}`} />
            </div>
          )}
          {!showChart && (
            <div className="dashboard-bottom-graph-section-item_click_section_item_img ">
              <Link href={ctaHref} className="hk-btn hk-liquid-wave" data-target="#line_chart_basic" onClick={handleClick}>
                <i className={ctaIconClass}></i> {ctaLabel}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

