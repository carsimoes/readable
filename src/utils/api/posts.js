export const getPosts = () =>
    fetch('http://localhost:3001/posts', {
        headers: {
            Authorization: 'whatever-you-want'
        }
    }).then(data => data.json())

export const getPostsByCategory = category =>
    fetch(`http://localhost:3001/${category}/posts`, {
        headers: {
            Authorization: 'whatever-you-want'
        }
    }).then(data => data.json())

export const fetchPost = id =>
    fetch(`http://localhost:3001/posts/${id}`, {
        headers: {
            Authorization: 'whatever-you-want'
        }
    }).then(data => data.json())

export const deletePost = id =>
    fetch(`http://localhost:3001/posts/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: 'whatever-you-want'
        }
    }).then(data => data.json())

export const vote = (id, vote) =>
    fetch(`http://localhost:3001/posts/${id}`, {
        method: 'POST',
        headers: {
            Authorization: 'whatever-you-want',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            option: vote
        })
    }).then(data => data.json())

export const add = data =>
    fetch(`http://localhost:3001/posts`, {
        method: 'POST',
        headers: {
            Authorization: 'whatever-you-want',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(data => data.json())

export const edit = (data, id) =>
    fetch(`http://localhost:3001/posts/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: 'whatever-you-want',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(data => data.json())