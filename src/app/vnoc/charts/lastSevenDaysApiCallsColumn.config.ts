import type { ApexOptions } from 'apexcharts'
import { format } from 'date-fns'

/** Seven consecutive days ending Apr-10-2026 (reference layout). */
const DAY_START = new Date(2026, 3, 7)

export const LAST_SEVEN_DAYS_CATEGORIES = Array.from({ length: 7 }, (_, i) =>
  format(new Date(DAY_START.getFullYear(), DAY_START.getMonth(), DAY_START.getDate() + i), 'MMM-dd-yyyy')
)

/** Approximate bar heights from reference chart. */
export const LAST_SEVEN_DAYS_VALUES = [15, 81, 10, 30, 10, 15, 25]

/** Per-bar colors: dark blue, orange, yellow, medium blue, magenta, light green, dark blue. */
const BAR_COLORS = [
  '#60b485',
  '#f3d25b',
  '#66b1ee',
  '#f1a742',
  '#ec4899',
  '#4ade80',
  '#172554',
]

/**
 * ApexCharts column chart — distributed colors, tilted date labels, Y 0–125 step 25.
 * 3D-style depth via gradient fill + chart shadow; scene tilt in CSS (`.vnoc-column-3d-*`).
 */
export function buildLastSevenDaysApiCallsColumnOptions(): ApexOptions {
  return {
    chart: {
      type: 'bar',
      height: 280,
      fontFamily: 'inherit',
      toolbar: { show: false },
      animations: { enabled: true, speed: 550 },
     
    },
    colors: BAR_COLORS,
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 3,
        borderRadiusApplication: 'end',
        columnWidth: '58%',
        dataLabels: { position: 'top' },
      },
    },
    fill: {
      type: 'solid',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    grid: {
      show: false,
      padding: { top: 8, right: 12, bottom: 4, left: 8 },
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: false } },
    },
    xaxis: {
      categories: [...LAST_SEVEN_DAYS_CATEGORIES],
      labels: {
        // rotateAlways forces text-anchor:end in Apex → labels drift off column centers
        rotate: 0,
        rotateAlways: false,
        hideOverlappingLabels: false,
        style: {
          fontSize: '11px',
          fontWeight: 400,
          colors: '#0f172a',
        },
      },
      axisBorder: { show: true, color: '#e2e8f0' },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 0,
      max: 125,
      stepSize: 25,
      decimalsInFloat: 0,
      labels: {
        style: {
          fontSize: '11px',
          fontWeight: 400,
          colors: '#000000',
        },
        formatter: (val) => String(Math.round(Number(val))),
      },
    },
    legend: { show: false },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
      style: { fontSize: '12px' },
      y: {
        formatter: (val: number) => `${val} calls`,
      },
    },
    states: {
      hover: { filter: { type: 'lighten' } },
      active: { filter: { type: 'none' } },
    },
  }
}
