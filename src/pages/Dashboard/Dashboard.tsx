import React from 'react';
import PublishRateChart from './Charts/PublishRateChart';
import { articlePublishData  } from './Charts/chart-data';
import Chart from 'react-apexcharts';

const Dashboard = () => {
    return(
        <>
            <h2 className="mb-4 mt-5 font-bold text-3xl">Dashboard</h2>
       
            <div className=" grid grid-cols-12 gap-x-8 gap-y-6">
                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                    <PublishRateChart
                        label="Publishing Rate"
                        text="40"
                    />
                </div>
                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                    <PublishRateChart
                        label="New subs"
                        text="1000"
                    />
                </div>
                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                    <PublishRateChart
                        label="New articles"
                        text="100"
                    />
                </div>
                <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                    <PublishRateChart
                        label="User engage rate"
                        text="70%"
                    />
                </div>

            </div>
            <div className='mt-14'>
                <div className="total-agents">
                    <div className="text-lg font-semibold">Articles published for the month</div>
                
                </div>
                {/* @ts-ignore */}
                <Chart {...articlePublishData } />
            </div>
        </>
    )
};

export default Dashboard;