import { delay, mapTo } from 'rxjs/operators';

import { PING, PONG } from '../state/ducks/chart';

/**
 * Epic - executed only for the first time takes action as input and returns another action.
 * @param action$
 */
export function chartEpic (action$, state) {
    return action$.ofType(PING)
        .pipe(
            delay(1000),
            mapTo({ type: PONG })
        );
}
