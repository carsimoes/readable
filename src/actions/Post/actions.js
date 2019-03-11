import * as PostApi from '../../utils/api/posts'
import * as CommentApi from '../../utils/api/comments'

export const ADD_POST = 'ADD_POST'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const GET_POST = 'GET_POST'
export const VOTE = 'VOTE'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY'

/* 
 The only way to change its state is by dispatching an action. 
 It’ll update depending upon the action type and the data passed with the action.
*/

export const postsById = (posts, actionType) => ({
    type: actionType,
    posts
})

export const fetchPost = id => dispatch =>
    PostApi.fetchPost(id)
    .then(post =>
        CommentApi.getComments(post.id)
        .then(comments => (post.comments = comments))
        .then(() => post)
    )
    .then(post => dispatch(postsById(post, GET_POST)))

export const fetchPosts = () => dispatch =>
    PostApi.getPosts()
    .then(posts =>
        Promise.all(
            posts.map(post =>
                CommentApi.getComments(post.id)
                .then(comments => (post.comments = comments))
                .then(() => post)
            )
        )
    )
    .then(posts => dispatch(postsById(posts, RECEIVE_POSTS)))

export const vote = (id, vote) => dispatch =>
    PostApi.vote(id, vote)
    .then(post =>
        CommentApi.getComments(post.id)
        .then(comments => (post.comments = comments))
        .then(() => post)
    )
    .then(post => dispatch(postsById(post, VOTE)))

export const fetchPostsByCategory = category => dispatch =>
    PostApi.getPostsByCategory(category)
    .then(posts =>
        Promise.all(
            posts.map(post =>
                CommentApi.getComments(post.id)
                .then(comments => (post.comments = comments))
                .then(() => post)
            )
        )
    )
    .then(posts => dispatch(postsById(posts, GET_POSTS_BY_CATEGORY)))

export const deletePost = id => dispatch =>
    PostApi.deletePost(id)
    .then(post =>
        CommentApi.getComments(post.id)
        .then(comments => (post.comments = comments))
        .then(() => post)
    )
    .then(post => dispatch(postsById(post, DELETE_POST)))

export const addPost = data => dispatch =>
    PostApi.add(data)
    .then(post =>
        CommentApi.getComments(post.id)
        .then(comments => (post.comments = comments))
        .then(() => post)
    )
    .then(post => dispatch(postsById(post, ADD_POST)))


export const editPost = (data, id) => dispatch =>
    PostApi.edit(data, id)
    .then(post =>
        CommentApi.getComments(post.id)
        .then(comments => (post.comments = comments))
        .then(() => post)
    )
    .then(post => dispatch(postsById(post, EDIT_POST)))