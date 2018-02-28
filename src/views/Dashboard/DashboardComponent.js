import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppHeader from '../../components/AppHeader/AppHeader.vue';
import PageHeader from '../../components/PageHeader/PageHeader.vue';
import Insights from '../../components/Insights/Insights.vue';
import Insight from '../../components/Insight/Insight.vue';
import SummaryFilters from '../../components/Filters/Summary/SummaryFilters.vue';
import SummaryChart from '../../components/Charts/Summary/SummaryChart.vue';
import UniqUsersFilters from '../../components/Filters/UniqUsers/UniqUsersFilters.vue';
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
        'summary-filters': SummaryFilters,
        'summary-chart': SummaryChart,
        'uniq-users-filters': UniqUsersFilters,
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
            sumSDate: null,
            sumEDate: null,
            sumBotChannels: ['FacebookMsgr', 'Web'],
            sumSubCategories: ['Intent', 'Help'],
            sumCategories: [
                'Store Questions', 'Not Defined', 'Rewards', 'Track Order', 'Live Agent Requests',
                'Offers & Deals Questions', 'App', 'Pricing Questions', 'Kohl\'s Cash Questions', 'Returs',
                'Gift Cards', 'Product Integrity', 'Password', 'Product Findability'
            ],
            uniWeek: '7/1/2017',
            uniBotChannel: 'FacebookMsgr',
            uniSubCategory: 'Intent',
            uniCategory: 'Store Questions',
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
