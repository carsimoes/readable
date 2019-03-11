import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'
import { receiveCategories } from './Category/reducers'
import { receiveComments, setCommentSorting } from './Comment/reducers'
import { setSorting } from './Sort/reducers'
import { postsById } from './Post/reducers'

export default combineReducers({
    receiveCategories,
    receiveComments,
    setSorting,
    postsById,
    setCommentSorting,
    loadingBar: loadingBarReducer,
})