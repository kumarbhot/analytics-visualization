/**
 * We use this file bootstrapping our application.
 * It means this only contains runnable
 */

// Vue

import { applyMiddleware, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueRx from 'vue-rx';

import { makeRootInstance } from './app/RootInstance';

import { makeRouter } from './router/helper';
import { makeRoutes } from './router/routes';

import { Storex } from './store/plugin';
import { createStore$ } from './store/store';

import { chartEpic } from './effects/chartEffects';

import { rootReducer } from './state/root';

import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';

// Disable warning
Vue.config.productionTip = false;

// Register Vue plugins
Vue.use(VueRouter);
Vue.use(VueRx);
Vue.use(Storex);
Vue.use(Vuetify, {
    theme: {
        primary: colors.purple.base,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3
    }
});

// Combine all the epics/effects to create a single merged epic
// Equivalent to Observable.merge()
const rootEpic = combineEpics(chartEpic);

// Redux middleware for side effects
const epicMiddleware = createEpicMiddleware(rootEpic);

// Create a redux store
const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware)
);

// Create store as a stream$
const store$ = createStore$(store);

// Make router
const router = makeRouter(makeRoutes(store$));

// Instantiate a Vue.js application with AppComponent and store
const rootInstance = makeRootInstance(router, store$);

// Tslint will cause error if `_` is not prefixed to app
const _app = new Vue(rootInstance);

// ESlint will cause error for unused variable declaration :)
console.log(_app);
