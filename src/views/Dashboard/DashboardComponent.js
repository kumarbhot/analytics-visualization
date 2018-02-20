import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Chart from '../Chart/Chart.vue';
import withRender from './DashboardComponent.html';
import { getData } from '../../api';

@withRender
@Component({
    components: {
        'chart': Chart
    }
})

export default class DashboardComponent extends Vue {
    data () {
        return {
            reclen: 0
        };
    }

    mounted () {
        const self = this;

        return getData()
            .then(data => {
                self.reclen = data.length;
            });
    }

    getData () {
        return getData();
    }
}
