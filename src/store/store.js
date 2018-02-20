// import { Action, Store } from 'redux';
// import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';

// Convert redux store into streamable store
// and then add method dispatch onto that store
export function createStore$ (store) {
    const store$ = from(store);
    store$.dispatch = store.dispatch.bind(store);

    return store$;
}
