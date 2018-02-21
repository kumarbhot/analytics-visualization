import Vue from 'vue';
import { Component } from 'vue-property-decorator';

/**
 * An Insight
 * @class Insight
 */
@Component({
    props: ['name']
})
export default class Insight extends Vue {
    data () {
        return {};
    }

    beforeDestroy () {
    }
}
