export const getComments = (id) =>
    fetch(`http://localhost:3001/posts/${id}/comments`, { headers: { 'Authorization': 'whatever-you-want' } })
        .then(data => data.json())
        .then(data => data)

export const add = (data) =>
    fetch(`http://localhost:3001/comments`,
        {
            method: 'POST',
            headers: {
                'Authorization': 'whatever-you-want',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(data => data.json())

export const vote = (id, vote) =>
    fetch(`http://localhost:3001/comments/${id}`,
        {
            method: 'POST',
            headers: {
                'Authorization': 'whatever-you-want',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ option: vote })
        })
        .then(data => data.json())

export const deleteComment = (id) =>
    fetch(`http://localhost:3001/comments/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': 'whatever-you-want',
            }
        })
        .then(data => data.json())
