import * as CategoryApi from '../../utils/api/categories'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

/*
Actions are payloads of information that send data from your application to your store. 
They are the only source of information for the store. You send them to the store using store.dispatch().
*/

export const categories = () =>
    dispatch =>
    CategoryApi.get().then(c => dispatch(receiveCategories(c)))

//Actions are plain JavaScript objects.
export const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
})