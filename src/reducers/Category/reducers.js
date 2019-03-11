import { RECEIVE_CATEGORIES } from '../../actions/Category/actions'

/*
Changes are made with pure functions.

Reducers are just pure functions that take the previous state and an action, and return the next state. 

Reducers specify how the application's state changes in response to actions sent to the store.
-Remember that actions only describe what happened, but don't describe how the application's state changes.

*/

export function receiveCategories(state = null, action) {
    switch (action.type) {
        case RECEIVE_CATEGORIES:
            return action.categories
        default:
            return state
    }
}