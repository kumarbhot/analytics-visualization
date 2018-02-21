import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as Highcharts from 'highcharts';

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

    parse (data) {
        const categories = data.reduce((acc, log) => {
            const category = log.Category;
            const errEntry = category === 'undefined' || category === 'Not Defined';

            if (!errEntry) {
                const exists = acc[category];

                if (exists) {
                    const yAvgMessages = exists.yAvgMessages;
                    const yAvgResponseTime = exists.yAvgResponseTime;
                    const yAvgSentiments = exists.yAvgSentiments;

                    acc[category] = {
                        yAvgMessages: yAvgMessages.concat(yAvgMessages),
                        yAvgResponseTime: yAvgResponseTime.concat(yAvgResponseTime),
                        yAvgSentiments: yAvgSentiments.concat(yAvgSentiments)
                    };
                } else {
                    acc[category] = {
                        yAvgMessages: [log.NumMessages],
                        yAvgResponseTime: [log.AvgResponseTime],
                        yAvgSentiments: [log.Sentiment]
                    };
                }
            }

            return acc;
        }, {});

        return Object.keys(categories)
            .map(category => {
                function average (allValues) {
                    const aggr = allValues.reduce((a, b) => parseFloat(a) + parseFloat(b));

                    return aggr / allValues.length;
                }

                const oCategory = categories[category];

                const messages = oCategory.yAvgMessages;
                const yAvgMessages = average(messages);

                const responseTimes = oCategory.yAvgResponseTime;
                const yAvgResponseTime = average(responseTimes);

                const sentiments = oCategory.yAvgSentiments;
                const yAvgSentiments = average(sentiments);

                return {
                    xAxisCategories: category,
                    yAvgMessages: yAvgMessages,
                    yAvgResponseTime: yAvgResponseTime,
                    yAvgSentiments: yAvgSentiments
                };
            })
            .reduce((acc, record) => {
                return {
                    xAxisCategories: acc.xAxisCategories.concat(record.xAxisCategories),
                    yAvgMessages: acc.yAvgMessages.concat(record.yAvgMessages),
                    yAvgResponseTime: acc.yAvgResponseTime.concat(record.yAvgResponseTime),
                    yAvgSentiments: acc.yAvgSentiments.concat(record.yAvgSentiments)
                };
            }, {
                xAxisCategories: [],
                yAvgMessages: [],
                yAvgResponseTime: [],
                yAvgSentiments: []
            });
    }

    renderChart (data) {
        if (data.length > 0) {
            const { xAxisCategories, yAvgMessages, yAvgResponseTime, yAvgSentiments } = this.parse(data);

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
