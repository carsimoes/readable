import * as CommentApi from '../../utils/api/comments'

export const ADD_COMMENT = 'ADD_COMMENT'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const COMMENT_VOTE = 'COMMENT_VOTE'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const SET_COMMENT_SORTING = 'SET_COMMENT_SORTING'

export const setCommentSorting = sortCommentsBy => ({
    type: SET_COMMENT_SORTING,
    sortCommentsBy
})

export const receiveComments = (comments, actionType) => ({
    type: actionType,
    comments
})

export const fetchComments = id => dispatch =>
    CommentApi.getComments(id).then(comments =>
        dispatch(receiveComments(comments, RECEIVE_COMMENTS))
    )

export const voteComment = (id, vote) => dispatch =>
    CommentApi.vote(id, vote).then(comment =>
        dispatch(receiveComments(comment, COMMENT_VOTE))
    )

export const deleteComment = id => dispatch =>
    CommentApi.deleteComment(id).then(comment =>
        dispatch(receiveComments(comment, DELETE_COMMENT))
    )

export const addComment = data => dispatch =>
    CommentApi.add(data).then(comment =>
        dispatch(receiveComments(comment, ADD_COMMENT))
    )