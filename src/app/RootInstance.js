/**
 * This is the only component written in JSX format.
 * This component need router to be associated
 */
// import Vue, { ComponentOptions, CreateElement } from 'vue';
// import VueRouter from 'vue-router';

// import { AppStore } from '../store/store';
import AppComponent from './AppComponent.vue';

/**
 * Generate `ComponentOptions` for Root Vue instance.
 * @export
 * @param {VueRouter} router `vue-router` instance
 * @param {Store<AppState>} store `Store` instance
 * @returns {ComponentOptions<Vue>}
 */
export function makeRootInstance (router, store) {
    return {
        el: '.app',

        name: 'RootInstance',

        router,

        store$: store,

        data () { return {}; },

        render (h) {
            // We could use tsx but it doesn't work. See these for more details.
            // https://medium.com/@chimon1984/taking-on-a-different-vue-with-tsx-c027cc0017f8
            // https://twitter.com/vuejs/status/768230962375294977?lang=en
            return h(AppComponent);
        }
    };
}
