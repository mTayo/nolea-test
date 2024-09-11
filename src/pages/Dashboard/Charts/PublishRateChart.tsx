import React from 'react';
import Chart from 'react-apexcharts';
import { publishData } from './chart-data';

const PublishRateChart = (props:any) => {
    const {label, text} = props;
    
    return (

        <div className="border p-3 rounded-md shadow-sm">
            <div className="text-lg font-bold">{label}</div>
            <div className="text-3xl font-bold">{text}</div>
            <div className="grid grid-cols-4 items-end">
                <div className="col-span-2">
                    <span className="app-text">60%</span> in this month
                </div>
                <div className="col-span-2">
                    {/* @ts-ignore */}
                    <Chart {...publishData} />
                </div>
                
            </div>
        </div>
       
    );
};

export default PublishRateChart;
