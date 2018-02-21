import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as Highcharts from 'highcharts';

/**
 * Renders the summary chart with given data
 * @class UniqueUsersChart
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
export default class UniqueUsersChart extends Vue {
    data () {
        return {};
    }

    parse (data) {
        return {};
    }

    renderChart (data) {
        if (data.length > 0) {
            Highcharts.chart(this.$el, {
                title: {
                    text: 'Unique Users'
                },

                subtitle: {
                    text: ''
                },

                yAxis: {
                    title: {
                        text: 'Number of Unique Users'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2010
                    }
                },

                series: [{
                    name: 'Unique Users',
                    data: [17, 23, 11, 2, 25, 10, 11, 14, 9, 20]
                }],

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            });
        }
    }
}
