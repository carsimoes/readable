import {
    RECEIVE_COMMENTS,
    COMMENT_VOTE,
    ADD_COMMENT,
    DELETE_COMMENT,
    SET_COMMENT_SORTING
} from '../../actions/Comment/actions'

export function setCommentSorting(state = null, action) {
    switch (action.type) {
        case SET_COMMENT_SORTING:
            return {
                ...state,
                sort: action.sortCommentsBy
            }
        default:
            return state
    }
}

export function receiveComments(state = {}, action) {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return {
                ...state,
                ...handleObj(action.comments)
            }

        case ADD_COMMENT:
        case COMMENT_VOTE:
        case DELETE_COMMENT:
            return {
                ...state,
                ...handleObj([action.comments])
            }

        default:
            return state
    }
}

function handleObj(items) {
    const newObj = {}
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const itemId = item.id
        newObj[itemId] = item
    }
    return newObj
}