export const INITIAL_STATE = {
    isPinging: false
};

export const PING = 'PING';
export const PONG = 'PONG';

/**
 * Reducer - Returns the new state depending on the action type.
 * @param state
 * @param action$
 */
export default function chartReducer (state = INITIAL_STATE, action$) {
    switch (action$.type) {
        case PING:
            return { isPinging: true };
        case PONG:
            return { isPinging: false };
        default:
            return state;
    }
}
