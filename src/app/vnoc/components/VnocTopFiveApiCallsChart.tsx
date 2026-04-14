'use client'

import ApexChart from '@/components/charts/ApexChart'
import {
  buildTopFiveApiCallsDonutOptions,
  TOP_FIVE_API_SERIES,
} from '@/app/vnoc/charts/topFiveApiCallsDonut.config'

type Props = {
  title?: string
  height?: number
  className?: string
}

/**
 * “Top Five API Calls” 3D-style donut — config lives under `src/app/vnoc/charts/`.
 */
export default function VnocTopFiveApiCallsChart({
  title = 'Top Five API Calls',
  height = 280,
  className = '',
}: Props) {
  const options = buildTopFiveApiCallsDonutOptions()
  if (options.chart && typeof options.chart === 'object') {
    options.chart = { ...options.chart, height }
  }

  return (
    <div className={`card mb-0 ${className}`.trim()}>
      <h5 className="card-header text-left font-semibold text-[#111827] dark:text-(--app-text)">
        {title}
      </h5>
      <div className="card-body pt-2">
        <div className="vnoc-donut-3d-scene flex items-center justify-center px-2 pb-2">
          <div className="w-full max-w-md">
            <ApexChart
              type="donut"
              height={height}
              options={options}
              series={TOP_FIVE_API_SERIES}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
