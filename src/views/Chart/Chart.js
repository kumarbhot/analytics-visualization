import Vue from 'vue';
import { Component } from 'vue-property-decorator';

/**
 * `AppComponent` is top level component.
 * It defines overall layout of the application.
 * @class AppComponent
 */
@Component({})
export default class Chart extends Vue {
    data () {
        return {
            sub1: null,
            isPinging: false
        };
    }

    pingClick () {
        this.store$.dispatch({ type: 'PING' });

        this.sub1 = this.store$
            .subscribe((state) => {
                this.isPinging = state.chart.isPinging;
            });
    }

    beforeDestroy () {
        this.sub1.unsubscribe();
    }
}
