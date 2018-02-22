import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppHeader from '../../components/AppHeader/AppHeader.vue';
import PageHeader from '../../components/PageHeader/PageHeader.vue';
import Insights from '../../components/Insights/Insights.vue';
import Insight from '../../components/Insight/Insight.vue';
import SummaryChart from '../../components/Charts/Summary/SummaryChart.vue';
import UniqueUsersChart from '../../components/Charts/UniqueUsers/UniqueUsersChart.vue';
import withRender from './DashboardComponent.html';
import { getSummary, getUniqueUsers } from '../../api';

@withRender
@Component({
    components: {
        'app-header': AppHeader,
        'page-header': PageHeader,
        'insights': Insights,
        'insight': Insight,
        'summary-chart': SummaryChart,
        'unique-users-chart': UniqueUsersChart
    }
})
export default class DashboardComponent extends Vue {
    data () {
        return {
            summary: [],
            fetchingSummary: true,
            uniqueUsers: [],
            fetchingUniqUsers: true,
            sDate: null,
            eDate: null,
            modalStart: false,
            modalEnd: false
        };
    }

    mounted () {
        const self = this;

        getSummary()
            .then(data => {
                self.summary = data;
                self.fetchingSummary = false;

                self.sDate = data[0].Date;
                self.eDate = data[data.length - 1].Date;
            });

        getUniqueUsers()
            .then(data => {
                self.uniqueUsers = data;
                self.fetchingUniqUsers = false;
            });
    }
}
