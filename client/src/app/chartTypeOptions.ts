import  {fromJS} from 'immutable';
import * as d3 from 'd3';

interface ILineChart {
    chart: {
        type: string;
        height: number;
        margin?: {
            top?: number;
            right?: number;
            bottom?: number;
            left?: number;
        };
        useInteractiveGuideline?: boolean;
        x?: any;
        y?: any
        dispatch?: {
            stateChange: () => void;
            changeState: () => void;
            tooltipShow: () => void;
            tooltipHide: () => void;
        };
        xAxis: {
            axisLabel: string;
        },
        yAxis: {
            axisLabel: string;
            axisLabelDistance: string;
        },
        callback?: () => void;
    };
    title?: {
        enable: boolean;
        text: string;
    }
}
interface IPieChart {
    chart: {
        type: string;
        height: 500;
        showLabels?: boolean;
        duration?: number;
        labelThreshold?: number;
        x?: any;
        y?: any;
        labelSunbeamLayout?: true;
        legend?: {
            margin?: {
                top?: number;
                bottom?: number;
                right?: number;
                left?: number;
            }
        }
    }
}
interface IMultiBarChart {
    chart: {
        type: string;
        height: number;
        clipEdge: boolean;
        duration: number;
        stacked: boolean;
        margin?: {
            top?: number;
            bottom?: number;
            right?: number;
            left?: number;
        }
        x?: any;
        y?: any;
        xAxis: {
            axisLabel: string;
            showMaxMin?: boolean;
        };
        yAxis: {
            axisLabel: string;
            axisLabelDistance: number;
            tickFormat: any;

        };
    }
}

export const PieChartOptions: IPieChart = {
    chart: {
        type: "pieChart",
        height: 500,
        showLabels: true,
        duration: 500,
        labelThreshold: 0.01,
        x: d => d.label,
        y: d => d.value,
        labelSunbeamLayout: true,
        legend: {
            margin: {
                top: 5,
                right: 35,
                bottom: 5,
                left: 0
            }
        }
    }
}
export const LineChartOptions = {
    chart: {
        type: "lineChart",
        height: 450,
        margin: {
            top: 20,
            right: 20,
            bottom: 40,
            left: 55
        },
        useInteractiveGuideline: true,
        x: d => d.x,
        y: d => d.y,
        xAxis: {
            axisLabel: "Time (ms)"
        },
        yAxis: {
            axisLabel: " Voltage (v)",
            axisLabelDistance: -10
        }
    },
    title: {
        enable: true,
        text: "Title for Line Chart"
    }
}
export const MultiBarChartOptions: IMultiBarChart = {
    chart: {
        type: "multiBarChart",
        height: 450,
        margin: {
            top: 20,
            right: 20,
            bottom: 45,
            left: 45
        },
        x: d => d.label,
        y: d => d.value,
        clipEdge: true,
        duration: 500,
        stacked: true,
        xAxis: {
            axisLabel: "Time (ms)",
            showMaxMin: false
        },
        yAxis: {
            axisLabel: "Y Axis",
            axisLabelDistance: -20,
            tickFormat: function(d){
                return d3.format('.00f')(d);
            }
        }
    }
}

export class ChartTypes {

    _chartTypes: string[] = [
        'lineChart',
        'discreteBarChart',
        'pieChart',
        'scatterChart',
        'multiBarChart',
        'candlestickBarChart',
        'ohlcBarChart',
        'boxPlotChart',
        'donutChart',
        'multiBarHorizontalChart',
        'linePlusBarWithFocusChart',
        'forceDirectedGraph'
    ];

    constructor() {

    }

    buildChart(options) {

        if(options.chart.type === 'pieChart') {

            return this.pieChart(options);
        }

        if(options.chart.type === 'lineChart') {

            return this.lineChart(options);
        }

        if(options.chart.type === 'multiBarChart') {

            return this.barChart(options);
        }

    }


    pieChart(options: IPieChart) {
        return fromJS(PieChartOptions).mergeDeep(options).toJS();
    }

    barChart(options: IMultiBarChart) {

        return fromJS(MultiBarChartOptions).mergeDeep(options).toJS();
    }

    lineChart(options: ILineChart) {

        return fromJS(LineChartOptions).mergeDeep(options).toJS();
    }
}
