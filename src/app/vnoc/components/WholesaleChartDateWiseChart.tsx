'use client'

import ApexChart from '@/components/charts/ApexChart'
import {
  buildWholesaleDateWiseDonutOptions,
  WHOLESALE_DATE_WISE_DEFAULT_SERIES,
} from '@/app/vnoc/charts/wholesaleChartDateWise'

type Props = {
  title?: string
  height?: number
  className?: string
  /** Hide card header when the title is shown by an outer accordion trigger. */
  hideHeader?: boolean
}

export default function WholesaleChartDateWiseChart({
  title = 'Validate Device ',
  height = 300,
  className = '',
  hideHeader = false,
}: Props) {
  const options = buildWholesaleDateWiseDonutOptions()
  if (options.chart && typeof options.chart === 'object') {
    options.chart = { ...options.chart, height }
  }

  return (
    <div className={`card mb-0 ${className}`.trim()}>
      {!hideHeader ? (
        <h5 className="card-header text-left font-semibold text-[#111827] dark:text-(--app-text)">
          {title}
        </h5>
      ) : null}
      <div className={hideHeader ? ' shadow-none' : ''}>
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <ApexChart
              type="donut"
              height={height}
              options={options}
              series={[...WHOLESALE_DATE_WISE_DEFAULT_SERIES]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
