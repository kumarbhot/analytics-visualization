import VueRouter from 'vue-router';

export function makeRouter (routes) {
    return new VueRouter({
        mode: 'history',
        routes
    });
}
