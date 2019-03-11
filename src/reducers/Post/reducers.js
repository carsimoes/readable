import {
    GET_POST,
    GET_POSTS_BY_CATEGORY,
    RECEIVE_POSTS,
    VOTE,
    ADD_POST,
    DELETE_POST,
    EDIT_POST
} from '../../actions/Post/actions'
//import { handleObj } from '../../utils/helpers/handleObj'

export function postsById(state = {}, action) {
    switch (action.type) {
        case RECEIVE_POSTS:
        case GET_POSTS_BY_CATEGORY:
            return {
                ...state,
                ...handleObj(action.posts)
            }

        case GET_POST:
        case VOTE:
        case ADD_POST:
        case DELETE_POST:
        case EDIT_POST:
            return {
                ...state,
                ...handleObj([action.posts])
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