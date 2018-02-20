import { combineReducers } from 'redux';

import chartReducer from './ducks/chart';

// Combine reducers to create root reducer
export const rootReducer = combineReducers({
    chart: chartReducer
});
