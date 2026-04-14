import type { ApexOptions } from 'apexcharts'

/** Labels and values: FindAccount (orange), Retrieve Account (navy). */
export const TOP_FIVE_API_LABELS = ['FindAccount', 'Retrieve Account'] as const

/** Series order matches labels: 4 + 13 = 17 */
export const TOP_FIVE_API_SERIES = [4, 13]

const COLORS = ['#FF6600', '#1e3a8a']

/**
 * ApexCharts donut options — depth via drop shadow + gradients; “3D” tilt applied in CSS wrapper.
 */
export function buildTopFiveApiCallsDonutOptions(): ApexOptions {
  return {
    labels: [...TOP_FIVE_API_LABELS],
    colors: COLORS,
    chart: {
      type: 'donut',
      height: 280,
      fontFamily: 'inherit',
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 6,
        left: 4,
        blur: 12,
        color: '#000',
        opacity: 0.22,
      },
      toolbar: { show: false },
      animations: {
        enabled: true,
        speed: 600,
      },
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        expandOnClick: false,
        offsetX: 0,
        offsetY: 4,
        customScale: 1,
        dataLabels: {
          minAngleToShowLabel: 0,
        },
        donut: {
          size: '62%',
          labels: {
            show: true,
            name: {
              show: false,
            },
            value: {
              show: false,
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total',
              fontSize: '13px',
              fontWeight: 600,
              color: '#64748b',
              formatter: (w) =>
                String(
                  w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0)
                ),
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        fontWeight: 600,
        colors: ['#0f172a'],
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.92,
      },
      dropShadow: { enabled: false },
      formatter(val, opts) {
        if (!opts) return ''
        const i = opts.seriesIndex
        const name = opts.w.globals.labels[i] as string
        const num = opts.w.globals.series[i] as number
        return `${name}: ${num}`
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['#ffffff'],
    },
    legend: {
      show: false,
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: (val: number) => `${val} calls`,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { height: 240 },
          dataLabels: { style: { fontSize: '11px' } },
        },
      },
    ],
  }
}
