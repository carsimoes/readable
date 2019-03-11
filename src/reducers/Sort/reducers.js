import {
    SET_SORTING
} from '../../actions/Sort/actions'

export function setSorting(state = null, action) {
    switch (action.type) {
        case SET_SORTING:
            return {
                ...state,
                sort: action.sortBy
            }
        default:
            return state
    }
}