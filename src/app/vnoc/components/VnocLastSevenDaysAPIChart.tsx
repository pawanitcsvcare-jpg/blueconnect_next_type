'use client'

import ApexChart from '@/components/charts/ApexChart'
import {
  buildLastSevenDaysApiCallsColumnOptions,
  LAST_SEVEN_DAYS_VALUES,
} from '@/app/vnoc/charts/lastSevenDaysApiCallsColumn.config'

type Props = {
  title?: string
  height?: number
  className?: string
}

const series = [{ name: 'API Calls', data: [...LAST_SEVEN_DAYS_VALUES] }]

/**
 * “Last Seven Days API Calls” column chart — config under `src/app/vnoc/charts/`.
 */
export default function VnocLastSevenDaysAPIChart({
  title = 'Last Seven Days API Calls',
  height = 280,
  className = '',
}: Props) {
  const options = buildLastSevenDaysApiCallsColumnOptions()
  if (options.chart && typeof options.chart === 'object') {
    options.chart = { ...options.chart, height }
  }

  return (
    <div className={`card mb-0 ${className}`.trim()}>
      <h5 className="card-header text-left font-semibold text-[#111827] dark:text-(--app-text)">
        {title}
      </h5>
      <div className="card-body pt-2">
        <div className="vnoc-chart-last-seven-days vnoc-column-3d-scene px-1 pb-1">
          <div className="w-full min-w-0">
            <ApexChart type="bar" height={height} options={options} series={series} />
          </div>
        </div>
      </div>
    </div>
  )
}
