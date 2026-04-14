'use client';

import React from 'react';

/**
 * DashboardCard
 * Mirrors structure/classes from src/app/dashboard2.html:922-940
 *
 * Props:
 * - imageSrc: string (e.g. "/assets/images/das1.png")
 * - imageAlt: string
 * - title: string (e.g. "Activations")
 * - value: string | number (e.g. "34,123")
 * - badgeText?: string (e.g. "2.8%")
 * - badgeClassName?: string additional classes for the badge (defaults to bootstrap success style from snippet)
 * - trailing?: ReactNode optional right-side content
 */
interface DashboardCardProps {
  imageSrc?: string
  imageAlt?: string
  title?: string
  value?: string | number
  badgeText?: string
  badgeClassName?: string
  trailing?: React.ReactNode
  badgeIcon?: string
  vsText?: string
}
export default function DashboardCard({
  imageSrc,
  imageAlt,
  title,
  value,
  badgeText,
  badgeClassName,
  trailing,
  badgeIcon,
  vsText,
}: DashboardCardProps) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="flex items-center gap-3">
          <div className="avatar-md">
            <span className="">
              <img src={imageSrc} alt={imageAlt} className="rounded-full" />
            </span>
          </div>
          <div className="overflow-hidden">
            <p className="dashboar-card-title mb-2"> {title}</p>
            <h3 className="dashboard-card-value mb-3">{value}</h3>
            {badgeText ? (
              <p className="text-muted mb-0 text-truncate font-size-14">
                <span
                  className={
                    badgeClassName ||
                    'budget-success me-1'
                  }
                >
                  <i className={`${badgeIcon}`}></i> {badgeText}
                </span>{' '}
               {vsText}
              </p>
            ) : null}
          </div>
          {trailing ? <div className="align-self-start">{trailing}</div> : null}
        </div>
      </div>
    </div>
  );
}

