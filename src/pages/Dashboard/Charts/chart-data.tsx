

export const publishData = {
    type: 'line',
    height: 60,
    options: {
        chart: {
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#FA7A53'],
        fill: {
            type: 'solid',
            opacity: 1
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        yaxis: {
            min: 0,
            max: 100
        },
        tooltip: {
            theme: 'dark',
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: () => 'Total Responses'
                }
            },
            marker: {
                show: false
            }
        }
    },
    series: [
        {
            name: 'series1',
            data: [10, 64, 90, 54, 20, 66, 4, 69]
        }
    ]
};


export const articlePublishData = {
    series: [
        {
            name: 'series1',
            data: [33, 4, 2, 71, 32, 19, 140, 97, 20, 16]
        }
    ],
    type: 'area',
    height: 375,
    options: {
        colors: ['#FA7A53'],
        chart: {
            // id: 'support-chart',
            // sparkline: {
            //     enabled: true
            // }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        xaxis: {
            categories: ['Martin', 'Georgia', 'Steve', 'Elizabeth', 'Roger', 'Aryan', 'John', 'Khabane', 'John', 'Khabane']
        },
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: () => 'Articles published '
                }
            },
            marker: {
                show: false
            }
        }
    }
};
