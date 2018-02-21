import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppHeader from '../../components/AppHeader/AppHeader.vue';
import PageHeader from '../../components/PageHeader/PageHeader.vue';
import Insights from '../../components/Insights/Insights.vue';
import Insight from '../../components/Insight/Insight.vue';
import Chart from '../../components/Chart/Chart.vue';
import withRender from './DashboardComponent.html';
import { getSummary, getUniqUsers } from '../../api';

@withRender
@Component({
    components: {
        'app-header': AppHeader,
        'page-header': PageHeader,
        'insights': Insights,
        'insight': Insight,
        'chart': Chart
    }
})
export default class DashboardComponent extends Vue {
    data () {
        return {
            summary: [],
            fetchingSummary: true,
            uniqUsers: [],
            fetchingUniqUsers: true
        };
    }

    mounted () {
        const self = this;

        getSummary()
            .then(data => {
                self.summary = data;
                self.fetchingSummary = false;
            });

        getUniqUsers()
            .then(data => {
                self.uniqUsers = data;
                self.fetchingUniqUsers = false;
            });
    }
}
