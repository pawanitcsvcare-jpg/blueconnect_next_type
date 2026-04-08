export const getActivitySeries = (data = [2, 12, 15, 18, 14, 22, 20]) => [
  { name: 'Activation', data }
];

export const activityOptions = {
  chart: { height: 255, type: 'line', zoom: { enabled: false }, toolbar: { show: false }, foreColor: '#9aa4b5' },
  markers: { size: 5, strokeWidth: 1, hover: { size: 6 } },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: [3, 3] },
  colors: ['#f8c547', '#ff7a45'],
  legend: {
    show: true,
    position: 'bottom',
    horizontalAlign: 'center',
    formatter: function (name, ctx) {
      const sum = ctx.w.globals.series[ctx.seriesIndex].reduce((acc, v) => acc + v, 0);
      return `${name} (${sum})`;
    }
  },
  grid: {
    borderColor: '#edf2f8',
    strokeDashArray: 0,
    xaxis: { lines: { show: true } },
    yaxis: { lines: { show: true } }
  },
  yaxis: {
    min: 50,
    max: 350,
    tickAmount: 4,
    labels: { style: { colors: '#ccc', fontSize: '11px' } }
  },
  xaxis: {
    categories: [],
    labels: { rotate: -48, style: { colors: '#ccc', fontSize: '11px' } },
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  tooltip: {
    shared: true,
    intersect: false,
    theme: 'light',
    style: { fontSize: '11px' },
    custom: function ({ series, dataPointIndex, w }) {
      const label = (w.globals.categoryLabels && w.globals.categoryLabels[dataPointIndex]) || '';
      const rows = (w.config.series || []).map(function (s, idx) {
        var color = (w.globals.colors && w.globals.colors[idx]) || '#111827';
        var val = (series[idx] && series[idx][dataPointIndex] != null) ? series[idx][dataPointIndex] : '-';
        return '<div style="display:flex;align-items:center;gap:6px;margin-top:2px">' +
                 '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:'+ color +'"></span>' +
                 '<span style="font-size:12px;color:#111827;">'+ s.name +': '+ val +'</span>' +
               '</div>';
      }).join('');
      return '<div style="background:#ffffff;border:1px solid #e5e7eb;padding:8px 10px;border-radius:8px;box-shadow:0 4px 10px rgba(0,0,0,0.08)">' +
               '<div style="font-size:11px;color:#6b7280;margin-bottom:4px">'+ label +'</div>' +
               rows +
             '</div>';
    }
  }
};

// Builder to create series/options exactly like the provided sample
export const buildActivityLineConfig = (activationData, deactivationData, categories) => {
  return {
    series: [
      { name: 'Activation', data: activationData },
      { name: 'Deactivation', data: deactivationData }
    ],
    options: { ...activityOptions, xaxis: { ...activityOptions.xaxis, categories } }
  };
};

// Builder for "Last 7 Days Usage" multi-series vertical bar chart
export const buildUsageBarConfig = (seriesMap, categories) => {
  // seriesMap: { Data: number[], SMS: number[], Voice: number[], MMS: number[] }
  const series = Object.keys(seriesMap).map((name) => ({
    name,
    data: seriesMap[name] || []
  }));

  const options = {
    chart: {
      type: 'bar',
      height: 260,
      stacked: false,
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        borderRadius: 1
      }
    },
    dataLabels: { enabled: false },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '16px',
      markers: { width: 12, height: 12, radius: 12 }
    },
    xaxis: {
      categories,
      labels: { style: { colors: '#aeb7c5', fontSize: '11px' } }
    },
    yaxis: {
      min: 0,
      tickAmount: 5,
      labels: { style: { colors: '#b5becd', fontSize: '11px' } }
    },
    grid: { borderColor: '#edf1f8' },
    colors: ['#3cb371', '#ffd739', '#44a5f5', '#ff9f1a'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.45,
        gradientToColors: ['#298150', '#d9ab21', '#2077c3', '#dd8309'],
        inverseColors: false,
        opacityFrom: 0.88,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    tooltip: {
      shared: true,
      intersect: false,
      theme: 'light',
      style: { fontSize: '11px' },
      custom: function ({ series, dataPointIndex, w }) {
        const label = (w.globals.categoryLabels && w.globals.categoryLabels[dataPointIndex]) || '';
        const rows = (w.config.series || []).map(function (s, idx) {
          var color = (w.globals.colors && w.globals.colors[idx]) || '#111827';
          var val = (series[idx] && series[idx][dataPointIndex] != null) ? series[idx][dataPointIndex] : '-';
          return '<div style="display:flex;align-items:center;gap:6px;margin-top:2px">' +
                   '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:'+ color +'"></span>' +
                   '<span style="font-size:12px;color:#111827;">'+ s.name +': '+ val +'</span>' +
                 '</div>';
        }).join('');
        return '<div style="background:#ffffff;border:1px solid #e5e7eb;padding:8px 10px;border-radius:8px;box-shadow:0 4px 10px rgba(0,0,0,0.08)">' +
                 '<div style="font-size:11px;color:#6b7280;margin-bottom:4px">'+ label +'</div>' +
                 rows +
               '</div>';
      }
    }
  };

  return { series, options };
};

// Builder for "Inventory Overview" donut chart
export const buildInventoryDonutConfig = (
  series = [40405, 15552, 19824],
  labels = ['Assigned', 'Not Assigned', 'Reserved']
) => {
  const formatCompactNumber = function (value) {
    return value >= 1000 ? (value / 1000).toFixed(1).replace(/\.0$/, '') + 'K' : '' + value;
  };

  const options = {
    labels,
    chart: { type: 'donut', height: 260 },
    plotOptions: {
      pie: {
        size: 100,
        offsetX: 0,
        offsetY: 0,
        donut: {
          size: '77%',
          labels: {
            show: true,
            name: { show: true, fontSize: '18px', offsetY: -5 },
            value: {
              show: true,
              fontSize: '24px',
              color: '#343a40',
              fontWeight: 500,
              offsetY: 10,
              formatter: function (val) {
                return formatCompactNumber(Number(val));
              },
            },
            total: {
              show: true,
              fontSize: '16px',
              label: 'Stock',
              color: '#9599ad',
              fontWeight: 400,
              formatter: function (w) {
                return formatCompactNumber(
                  w.globals.seriesTotals.reduce(function (acc, n) {
                    return acc + n;
                  }, 0)
                );
              },
            },
          },
        },
      },
    },
    dataLabels: { enabled: false },
    legend: {
      show: true,
      position: 'bottom',
      formatter: function (name, opts) {
        return `${name} (${formatCompactNumber(opts.w.globals.series[opts.seriesIndex])})`;
      },
    },
    yaxis: {
      labels: {
        formatter: function (v) {
          return '' + v;
        },
      },
    },
    stroke: { lineCap: 'round', width: 2 },
    colors: ['#38bc81', '#fbb225', '#43aae8'],
    tooltip: { shared: false, intersect: true, theme: 'light' },
  };

  return { series, options };
};

// Builder for "Top Activations - Billing" donut chart
export const buildTopActivationsDonutConfig = (
  series = [3409, 3010, 1840, 1200, 900, 1500],
  labels = ['Rivertel', 'powermobile', 'SalesDemo', 'Infiniti', 'AttLiveTest', 'Others']
) => {
  const formatCompactNumber = (value) =>
    value >= 1000 ? (value / 1000).toFixed(1).replace(/\.0$/, '') + 'K' : '' + value;

  const options = {
    labels,
    chart: { type: 'donut', height: 264 },
    plotOptions: {
      pie: {
        size: 100,
        offsetX: 0,
        offsetY: 0,
        donut: {
          size: '77%',
          labels: {
            show: true,
            name: { show: true, fontSize: '18px', offsetY: -5 },
            value: {
              show: true,
              fontSize: '24px',
              color: '#343a40',
              fontWeight: 500,
              offsetY: 10,
              formatter: function (val) {
                return formatCompactNumber(Number(val));
              },
            },
            total: {
              show: true,
              fontSize: '16px',
              label: 'Grand Total',
              color: '#9599ad',
              fontWeight: 400,
              formatter: function (w) {
                return formatCompactNumber(
                  w.globals.seriesTotals.reduce(function (acc, n) {
                    return acc + n;
                  }, 0)
                );
              },
            },
          },
        },
      },
    },
    dataLabels: { enabled: false },
    legend: {
      show: true,
      position: 'right',
      formatter: function (name, opts) {
        return `${name} (${formatCompactNumber(opts.w.globals.series[opts.seriesIndex])})`;
      },
    },
    yaxis: {
      labels: {
        formatter: function (v) {
          return '' + v;
        },
      },
    },
    stroke: { lineCap: 'round', width: 2 },
    colors: ['#38bc81', '#8bcd86', '#fbb326', '#f46339', '#43aae8', '#999999'],
    tooltip: { shared: false, intersect: true, theme: 'light' },
  };

  return { series, options };
};

// Bulk Uploading Overview legend hover interaction initializer
// Usage: const cleanup = initBulkUploadingOverview(rootElement)
export const initBulkUploadingOverview = (root) => {
  if (!root) return () => {};

  const chartRoot = root.querySelector('.chart-row-line-main');
  const legendRoot = root.querySelector('.chart-row-line-main-legents');
  if (!chartRoot || !legendRoot) return () => {};

  const columns = Array.from(chartRoot.querySelectorAll('.chart-row-line-item-under'));
  const legends = Array.from(legendRoot.querySelectorAll('.chart-row-line-main-legents-item'));
  if (!columns.length || !legends.length) return () => {};

  const hoverTooltip = document.createElement('div');
  hoverTooltip.className = 'bulk-hover-tooltip';
  hoverTooltip.innerHTML =
    '<div>Total New SIM: 0</div>' +
    '<div>Total Completed SIM: 0</div>' +
    '<div>Total Processing SIM: 0</div>' +
    '<div>Total Failed SIM: 0</div>';
  document.body.appendChild(hoverTooltip);

  const columnData = [
    [12, 28, 20, 6],
    [18, 11, 15, 9],
    [7, 14, 23, 5],
    [22, 6, 152, 10],
    [10, 17, 19, 8],
    [25, 9, 16, 4],
    [90, 5, 28, 12],
    [14, 18, 11, 7],
    [20, 77, 94, 13],
    [116, 16, 22, 9],
    [97, 10, 119, 55]
  ];

  const blockSelectors = [
    '.chart-row-line-item-under-item1',
    '.chart-row-line-item-under-item2',
    '.chart-row-line-item-under-item3',
    '.chart-row-line-item-under-item4'
  ];

  const setColumnHeights = (column, percents) => {
    blockSelectors.forEach((selector, blockIndex) => {
      const block = column.querySelector(selector);
      if (!block) return;
      block.style.height = `${percents[blockIndex]}%`;
      block.textContent = '';
    });
  };

  const renderColumn = (index) => {
    const values = columnData[index];
    if (!values) return;
    const column = columns[index];
    if (!column) return;
    setColumnHeights(column, values);
  };

  const resetColumns = () => {
    columns.forEach((_column, index) => renderColumn(index));
  };

  const clearStates = () => {
    chartRoot.classList.remove('bulk-hovering');
    columns.forEach((col) => col.classList.remove('is-active'));
    resetColumns();
    legends.forEach((legend) => legend.classList.remove('is-active'));
    hoverTooltip.classList.remove('is-visible');
  };

  const showTooltip = (targetEl, index) => {
    const values = columnData[index] || [0, 0, 0, 0];
    const legendName = legends[index] ? legends[index].textContent.trim() : 'Details';
    const data = {
      newSim: values[0],
      completedSim: values[1],
      processingSim: values[2],
      failedSim: values[3]
    };
    const line = (color, label, value) =>
      `<div><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${color};margin-right:6px;vertical-align:middle;"></span>${label}: ${value}</div>`;

    hoverTooltip.innerHTML =
      `<div style="font-weight:700;margin-bottom:6px;">${legendName}</div>` +
      line('#62b888', 'Total New SIM', data.newSim) +
      line('#ebcd64', 'Total Completed SIM', data.completedSim) +
      line('#61aae8', 'Total Processing SIM', data.processingSim) +
      line('#edb160', 'Total Failed SIM', data.failedSim);

    const rect = targetEl.getBoundingClientRect();
    hoverTooltip.style.left = `${rect.left + rect.width / 2 + 28}px`;
    hoverTooltip.style.top = `${rect.top - 8}px`;
    hoverTooltip.classList.add('is-visible');
  };

  const activate = (index, targetEl, shouldShowTooltip) => {
    clearStates();
    chartRoot.classList.add('bulk-hovering');
    if (columns[index]) columns[index].classList.add('is-active');
    if (legends[index]) legends[index].classList.add('is-active');
    renderColumn(index);
    if (shouldShowTooltip && targetEl) showTooltip(targetEl, index);
  };

  const cleanups = [];
  legends.forEach((legend, index) => {
    const onEnter = () => activate(index, columns[index], true);
    const onClick = () => activate(index, columns[index], true);
    const onLeave = () => clearStates();
    legend.addEventListener('mouseenter', onEnter);
    legend.addEventListener('click', onClick);
    legend.addEventListener('mouseleave', onLeave);
    cleanups.push(() => {
      legend.removeEventListener('mouseenter', onEnter);
      legend.removeEventListener('click', onClick);
      legend.removeEventListener('mouseleave', onLeave);
    });
  });

  columns.forEach((column, index) => {
    const onEnter = () => activate(index, column, true);
    const onLeave = () => clearStates();
    column.addEventListener('mouseenter', onEnter);
    column.addEventListener('mouseleave', onLeave);
    cleanups.push(() => {
      column.removeEventListener('mouseenter', onEnter);
      column.removeEventListener('mouseleave', onLeave);
    });
  });

  resetColumns();

  return () => {
    cleanups.forEach((fn) => fn());
    hoverTooltip.remove();
  };
};
