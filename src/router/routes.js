import DashboardComponent from '../views/Dashboard/DashboardComponent';

export function makeRoutes () {
    const routes = [];

    // Take user by default on Dashboard Page.
    routes.push({
        name: 'Dashboard',
        path: '/',
        component: DashboardComponent
    });

    return routes;
}
