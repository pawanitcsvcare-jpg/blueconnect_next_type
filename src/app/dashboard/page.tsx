'use client';

import React, { useEffect, useRef, useState } from 'react'
import DashboardHeader from '../components/Dashboard/DashboardHeader'
import DashboardCard from '../components/Dashboard/DashboardCard'
import das1 from '../assets/images/das1.png'
import das2 from '../assets/images/das2.png'
import das5 from '../assets/images/das5.png'
import das4 from '../assets/images/das4.png'
import das3 from '../assets/images/das3.png'
import dashboard_graph1 from '../assets/images/dashboard_graph1.png'
import dashboard_graph2 from '../assets/images/dashboard_graph2.png'
import dashboard_graph3 from '../assets/images/dashboard_graph3.png'
import dashboard_graph4 from '../assets/images/dashboard_graph4.png'
import dashboard_graph5 from '../assets/images/dashboard_graph5.png'   
import GraphCard from '../components/Dashboard/GraphCard'
import { activityOptions, getActivitySeries, buildActivityLineConfig, buildUsageBarConfig, initBulkUploadingOverview, buildTopActivationsDonutConfig, buildInventoryDonutConfig } from '../components/charts/configs/dashboardCharts'
export default function Dashboard() {
    const bulkSectionRef = useRef(null);
    const [showBulkChart, setShowBulkChart] = useState(false);

    useEffect(() => {
        if (!showBulkChart) return;
        const root = bulkSectionRef.current;
        return initBulkUploadingOverview(root);
    }, [showBulkChart]);


    const { series: activitySeries, options: activityOpts } = buildActivityLineConfig(
        [78,92,88,95,150,112,121],
        [83,74,90,86,94,98,88],
        ["Mar 20-2026","Mar 19-2026","Mar 18-2026","Mar 17-2026","Mar 16-2026","Mar 15-2026","Mar 14-2026"]
    );

    const { series: usageSeries, options: usageOpts } = buildUsageBarConfig(
        {
            Data: [48,80,90,144,60,50,64],
            SMS: [56,79,160,70,150,130,62],
            Voice: [67,114,92,120,140,140,70],
            MMS: [52,140,93,55,120,90,110]
        },
        ["Mar 20-2026","Mar 19-2026","Mar 18-2026","Mar 17-2026","Mar 16-2026","Mar 15-2026","Mar 14-2026"]
    );
    const { series: topActivationsSeries, options: topActivationsOpts } = buildTopActivationsDonutConfig(
        [3409, 3010, 1840, 1200, 900, 1500],
        ["Rivertel", "powermobile", "SalesDemo", "Infiniti", "AttLiveTest", "Others"]
    );
    const { series: inventorySeries, options: inventoryOpts } = buildInventoryDonutConfig(
        [40405, 15552, 19824],
        ["Assigned", "Not Assigned", "Reserved"]
    );

    

  return (
    <>
    <DashboardHeader />
    <div className="dashboard-top-card mt-3">

        <DashboardCard
            imageSrc={das1.src}
            imageAlt="Activations"
            title="Activations"
            value="34,657"
            badgeText="0.6%"
            vsText="vs last month"
            badgeIcon="mdi mdi-arrow-top-right"
        />

        <DashboardCard
            imageSrc={das2.src}
            imageAlt="Deactivation"
            title="Deactivation"
            value="1,200"
            badgeText="0.2%"
            badgeClassName="budget-danger"
            badgeIcon="ri-arrow-right-down-line"
            vsText="vs yesterday"
        />

          <DashboardCard
            imageSrc={das5.src}
            imageAlt="Today's Usage"
            title="Today's Usage"
            value="90 GB"
            badgeText="1.4%%"
            badgeIcon="mdi mdi-arrow-top-right"
            vsText="vs last month"
        />

        <DashboardCard
            imageSrc={das3.src}
            imageAlt="MSISDN Snapshot"
            title="MSISDN Snapshot"
            value="2,845"
            badgeText="4.50%%"
            badgeIcon="mdi mdi-arrow-top-right"
            vsText="vs last month"
        />

        <DashboardCard
            imageSrc={das4.src}
            imageAlt="API Success Rate"
            title="API Success Rate"
            value="98.5%"
            badgeText="4.50%%"
             badgeClassName="budget-danger"
            badgeIcon="ri-alert-fill"
            vsText="1.30K failed"
        />

    </div>

<div className='dashboard-bottom-graph-section mt-3'>

    <div className='flex gap-[15px]'>
        <div className='col-sm-12 col-lg-5'>
            <GraphCard
                title="Last 7 Days Activity"
                imageSrc={dashboard_graph1.src}
                chartType="line"
                chartHeight={245}
                chartOptions={activityOpts}
                chartSeries={activitySeries}
                ctaHref="#"
                ctaLabel="Click to View"
                ctaIconClass="ri-bar-chart-line"
            />
        </div>

        <div className='col-sm-12 col-lg-5'>
            <GraphCard
                title="Last 7 Days Usage"
                imageSrc={dashboard_graph2.src}
                chartType="bar"
                chartHeight={245}
                chartOptions={usageOpts}
                chartSeries={usageSeries}
                ctaHref="#"
                ctaLabel="Click to View"
                ctaIconClass="ri-bar-chart-line"
            />
        </div>

        <div className="col-sm-12 col-lg-2">
            <GraphCard
                title="Inventory Overview"
                imageSrc={dashboard_graph3.src}
                imageAlt="Inventory Overview Chart"
                chartType="donut"
                chartHeight={260}
                chartOptions={inventoryOpts}
                chartSeries={inventorySeries}
                ctaHref="#"
                ctaLabel="Click to View"
                ctaIconClass="ri-bar-chart-line"
            />

        </div>
    </div>

</div>
    

<div className='dashboard-bottom-graph-section mt-4 mb-3'>
    <div className='flex gap-4'>
        <div className='w-full lg:w-8/12'>
          
        <div className="card mb-0">
                        <h5 className="card-header">Bulk Uploading Overview</h5>
                        <div className="card-body pt-0 d-flex align-items-center justify-content-between">
                        {!showBulkChart && (
                          <div className="dashboard-bottom-graph-section-item_click_section">
                            <div className="dashboardimg1section">
                              <img src={dashboard_graph4.src} alt="Bulk Uploading Overview Chart" className="dashboardimg1section_img" />
                            </div>
                            <div className="dashboard-bottom-graph-section-item_click_section_item_img ">
                              <a
                                href="#"
                                className="hk-btn hk-liquid-wave"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setShowBulkChart(true);
                                }}
                              >
                                <i className="ri-bar-chart-line"></i> Click to View
                              </a>
                            </div>
                          </div>
                        )}
                           {showBulkChart && (
                           <div className='flex gap-4 justify-between items-center' ref={bulkSectionRef}>
                           <div className='bulk-uploading-overview-container'>
                           <div className="chart-row-line-main">
                                <div className="chart-row-line-item-under">
                                    <div className="chart-row-line-item-under-item1"></div>
                                    <div className="chart-row-line-item-under-item2"></div>
                                    <div className="chart-row-line-item-under-item3"></div>
                                    <div className="chart-row-line-item-under-item4"></div>
                                </div>

                                <div className="chart-row-line-item-under">
                                    <div className="chart-row-line-item-under-item1"></div>
                                    <div className="chart-row-line-item-under-item2"></div>
                                    <div className="chart-row-line-item-under-item3"></div>
                                    <div className="chart-row-line-item-under-item4"></div>
                                </div>

                                <div className="chart-row-line-item-under">
                                    <div className="chart-row-line-item-under-item1"></div>
                                    <div className="chart-row-line-item-under-item2"></div>
                                    <div className="chart-row-line-item-under-item3"></div>
                                    <div className="chart-row-line-item-under-item4"></div>
                                </div>

                                <div className="chart-row-line-item-under">
                                    <div className="chart-row-line-item-under-item1"></div>
                                    <div className="chart-row-line-item-under-item2"></div>
                                    <div className="chart-row-line-item-under-item3"></div>
                                    <div className="chart-row-line-item-under-item4"></div>
                                </div>

                                <div className="chart-row-line-item-under">
                                    <div className="chart-row-line-item-under-item1"></div>
                                    <div className="chart-row-line-item-under-item2"></div>
                                    <div className="chart-row-line-item-under-item3"></div>
                                    <div className="chart-row-line-item-under-item4"></div>
                                </div>

                                <div className="chart-row-line-item-under">
                                    <div className="chart-row-line-item-under-item1"></div>
                                    <div className="chart-row-line-item-under-item2"></div>
                                    <div className="chart-row-line-item-under-item3"></div>
                                    <div className="chart-row-line-item-under-item4"></div>
                                </div>

                                <div className="chart-row-line-item-under">
                                    <div className="chart-row-line-item-under-item1"></div>
                                    <div className="chart-row-line-item-under-item2"></div>
                                    <div className="chart-row-line-item-under-item3"></div>
                                    <div className="chart-row-line-item-under-item4"></div>
                                </div>

                                <div className="chart-row-line-item-under">
                                    <div className="chart-row-line-item-under-item1"></div>
                                    <div className="chart-row-line-item-under-item2"></div>
                                    <div className="chart-row-line-item-under-item3"></div>
                                    <div className="chart-row-line-item-under-item4"></div>
                                </div>

                                <div className="chart-row-line-item-under">
                                    <div className="chart-row-line-item-under-item1"></div>
                                    <div className="chart-row-line-item-under-item2"></div>
                                    <div className="chart-row-line-item-under-item3"></div>
                                    <div className="chart-row-line-item-under-item4"></div>
                                </div>

                                <div className="chart-row-line-item-under">
                                    <div className="chart-row-line-item-under-item1"></div>
                                    <div className="chart-row-line-item-under-item2"></div>
                                    <div className="chart-row-line-item-under-item3"></div>
                                    <div className="chart-row-line-item-under-item4"></div>
                                </div>

                                <div className="chart-row-line-item-under">
                                    <div className="chart-row-line-item-under-item1"></div>
                                    <div className="chart-row-line-item-under-item2"></div>
                                    <div className="chart-row-line-item-under-item3"></div>
                                    <div className="chart-row-line-item-under-item4"></div>
                                </div>
                                </div>


                            <div className="chart-row-line-main-legents">
                                <div className="chart-row-line-main-legents-item">
                                    <span className="chart-row-line-main-legents-item-icon"></span>
                                    SIM Activation
                                </div>
                                <div className="chart-row-line-main-legents-item">
                                    <span className="chart-row-line-main-legents-item-icon"></span>
                                    Plan Change
                                </div>
                                <div className="chart-row-line-main-legents-item">
                                    <span className="chart-row-line-main-legents-item-icon"></span>
                                    MSISDN Disconnect
                                </div>
                                <div className="chart-row-line-main-legents-item">
                                    <span className="chart-row-line-main-legents-item-icon"></span>
                                    MSISDN Reconnect
                                </div>
                                <div className="chart-row-line-main-legents-item">
                                    <span className="chart-row-line-main-legents-item-icon"></span>
                                    MSISDN Change
                                </div>
                                <div className="chart-row-line-main-legents-item">
                                    <span className="chart-row-line-main-legents-item-icon"></span>
                                    SIM Change
                                </div>
                                <div className="chart-row-line-main-legents-item">
                                    <span className="chart-row-line-main-legents-item-icon"></span>
                                    Restore
                                </div>
                                <div className="chart-row-line-main-legents-item">
                                    <span className="chart-row-line-main-legents-item-icon"></span>
                                    Suspended
                                </div>
                                <div className="chart-row-line-main-legents-item">
                                    <span className="chart-row-line-main-legents-item-icon"></span>
                                    Purchase Topup
                                </div>
                                <div className="chart-row-line-main-legents-item">
                                    <span className="chart-row-line-main-legents-item-icon"></span>
                                    Suspend Service
                                </div>
                                <div className="chart-row-line-main-legents-item">
                                    <span className="chart-row-line-main-legents-item-icon"></span>
                                    Restore Service
                                </div>
                            </div>
                            </div>
                            

                            <div className="bulk-uploading-overview-container-bottom">
                                <div className="bulk-uploading-overview-container-bottom-item"><span className="bulk-uploading-overview-container-bottom-item-icon colbylek1"></span>Total New SIM (4.5K)</div>
                                    <div className="bulk-uploading-overview-container-bottom-item"><span className="bulk-uploading-overview-container-bottom-item-icon colbylek2"></span>Total Completed SIM (3.8K)</div>
                                <div className="bulk-uploading-overview-container-bottom-item"><span className="bulk-uploading-overview-container-bottom-item-icon colbylek3"></span>Total Processing SIM (2.2K)</div>
                                <div className="bulk-uploading-overview-container-bottom-item"><span className="bulk-uploading-overview-container-bottom-item-icon colbylek4"></span>Total Failed SIM (1.1K)</div>
                            </div>
                            </div>
                            )}
                        </div>
                    </div>
        </div>

        <div className='w-full lg:w-4/12'>
            <GraphCard
                title="Top Activations - Billing"
                imageSrc={dashboard_graph5.src}
                chartType="donut"
                chartHeight={255}
                chartOptions={topActivationsOpts}
                chartSeries={topActivationsSeries}
                imageAlt=">Top Activations - Billing Chart"
                ctaHref="#"
                ctaLabel="Click to View"
                ctaIconClass="ri-bar-chart-line"
                imageWidth="imageWidth"
            />
        </div>
    </div>
    </div>  
        </>
  )
}
