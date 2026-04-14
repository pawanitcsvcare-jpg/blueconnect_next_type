import type { ApexOptions } from 'apexcharts'

export const WHOLESALE_DATE_WISE_LABELS = ['Success', 'Failed'] as const

/** Demo counts — replace with API totals; percentages come from formatter. */
export const WHOLESALE_DATE_WISE_DEFAULT_SERIES = [784, 216] as const

const COLORS = ['#34d399', '#f87171']

/**
 * Full-ring donut (360°) for date-wise success vs failed — segment % labels, white gaps, bottom legend.
 */
export function buildWholesaleDateWiseDonutOptions(): ApexOptions {
  return {
    labels: [...WHOLESALE_DATE_WISE_LABELS],
    colors: COLORS,
    chart: {
      type: 'donut',
      height: 280,
      width: '100%',
      fontFamily: 'inherit',
      toolbar: { show: false },
      animations: { enabled: true, speed: 550 },
      offsetY: 0,
      dropShadow: {
        enabled: true,
        top: 4,
        left: 2,
        blur: 8,
        color: '#000',
        opacity: 0.12,
      },
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        expandOnClick: false,
        offsetY: 0,
        offsetX: 0,
        customScale: 1,
        dataLabels: {
          minAngleToShowLabel: 0,
        },
        donut: {
          size: '68%',
          labels: {
            show: false,
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      background: {
        enabled: false,
      },
      style: {
        fontSize: '12px',
        fontWeight: 700,
        colors: ['#ffffff'],
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        color: '#000000',
        opacity: 0.55,
      },
      formatter(val: number, opts) {
        if (!opts?.w?.globals?.seriesTotals?.length) return ''
        const i = opts.seriesIndex
        const sum = opts.w.globals.seriesTotals.reduce(
          (a: number, b: number) => a + b,
          0
        ) as number
        const raw = Number(opts.w.globals.series[i])
        if (!sum || Number.isNaN(raw)) return '0%'
        return `${((raw / sum) * 100).toFixed(1)}%`
      },
    },
    stroke: {
      show: true,
      width: 3,
      colors: ['#ffffff'],
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '12px',
      fontWeight: 500,
      onItemClick: {
        toggleDataSeries: false,
      },
      markers: {
        size: 10,
        shape: 'circle',
        strokeWidth: 0,
      },
      itemMargin: {
        horizontal: 20,
        vertical: 6,
      },
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
      style: { fontSize: '12px' },
      y: {
        formatter: (val: number, opts) => {
          const i = opts?.seriesIndex ?? 0
          const name = opts?.w?.globals?.labels?.[i] ?? ''
          return `${name} ${val}`
        },
      },
    },
    responsive: [
      {
        breakpoint: 520,
        options: {
          chart: { height: 260 },
          dataLabels: { style: { fontSize: '11px' } },
        },
      },
    ],
  }
}
