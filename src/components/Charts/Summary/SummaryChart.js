import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as Highcharts from 'highcharts';
import { SummaryParser } from './SummeryParser';

/**
 * Renders the summary chart with given data
 * @class SummaryChart
 */
@Component({
    props: {
        data: {
            type: Array,
            default: []
        },
        fetching: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        'data': {
            handler: 'renderChart',
            immediate: true
        }
    }
})
export default class SummaryChart extends Vue {
    data () {
        return {};
    }

    renderChart (data) {
        if (data.length > 0) {
            const { xAxisCategories, yAvgMessages, yAvgResponseTime, yAvgSentiments } = SummaryParser(data);

            Highcharts.chart(this.$el, {
                chart: {
                    zoomType: 'xy'
                },
                title: {
                    text: 'ChatBot Statistics'
                },
                subtitle: {
                    text: 'Summarized View'
                },
                xAxis: [{
                    categories: xAxisCategories,
                    crosshair: true
                }],
                yAxis: [{ // Primary yAxis
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[2]
                        }
                    },
                    title: {
                        text: 'Sentiments',
                        style: {
                            color: Highcharts.getOptions().colors[2]
                        }
                    },
                    opposite: true

                }, { // Secondary yAxis
                    gridLineWidth: 0,
                    title: {
                        text: 'Messages',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    }

                }, { // Tertiary yAxis
                    gridLineWidth: 0,
                    title: {
                        text: 'Average Response Time',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    labels: {
                        format: '{value} ms',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    opposite: true
                }],
                tooltip: {
                    shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 80,
                    verticalAlign: 'top',
                    y: 55,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                },
                series: [{
                    name: 'Messages',
                    type: 'column',
                    yAxis: 1,
                    data: yAvgMessages,
                    tooltip: {
                        valueSuffix: ''
                    }

                }, {
                    name: 'Average Response Time',
                    type: 'spline',
                    yAxis: 2,
                    data: yAvgResponseTime,
                    marker: {
                        enabled: false
                    },
                    dashStyle: 'shortdot',
                    tooltip: {
                        valueSuffix: ' ms'
                    }

                }, {
                    name: 'Sentiments',
                    type: 'spline',
                    data: yAvgSentiments,
                    tooltip: {
                        valueSuffix: ''
                    }
                }]
            });
        }
    }
}
