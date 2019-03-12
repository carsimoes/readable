import React, { Component } from 'react'
import { connect } from 'react-redux'
import compose from 'recompose/compose'

//Actions
import { editPost, fetchPost, deletePost, vote } from '../actions/Post/actions'
import { fetchComments, addComment, setCommentSorting } from '../actions/Comment/actions'

//Components
import EditComment from '../components/EditComment'

//Material ui
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import UnlikeIcon from '@material-ui/icons/ThumbDown'
import LikeIcon from '@material-ui/icons/ThumbUp'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Delete from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const uuidv1 = require('uuid/v1')

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    selectAlign: {
        marginLeft: 10
    }
});

class PostDetail extends Component {
    state = {
        commentAuthor: '',
        commentContent: '',
        postEditorVisible: false,
        postTitle: '',
        postAuthor: '',
        postCategory: '',
        postContent: '',
        postId: '',
        openDialogConfirmDelete: false
    }

    componentWillMount() {
        this.props
            .fetchData(this.props.match.params.post_id, 'BY_SCORE_HIGHEST')
            .then(
                () =>
                    this.props.location.state &&
                    this.props.location.state.postEditorVisible &&
                    this.showPostEditor()
            )
    }

    showPostEditor() {
        this.setState({
            postTitle: this.props.post[this.props.match.params.post_id].title,
            postAuthor: this.props.post[this.props.match.params.post_id].author,
            postCategory: this.props.post[this.props.match.params.post_id].category,
            postContent: this.props.post[this.props.match.params.post_id].body,
            postEditorVisible: true,
            postId: this.props.match.params.post_id
        })
    }

    submitVote = (id, voteType) => {
        this.props.dispatch(vote(id, voteType))
    }

    handleInputChange = event => {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        const data = {
            id: uuidv1(),
            timestamp: Date.now(),
            body: this.state.commentContent,
            author: this.state.commentAuthor,
            parentId: this.props.match.params.post_id,
            voteScore: 0,
            deleted: false,
            parentDeleted: false
        }

        this.props.dispatch(addComment(data))

        this.setState({
            commentContent: '',
            commentAuthor: ''
        });

    }

    handlePostSubmit = event => {
        event.preventDefault()
        const data = {
            id: this.props.post[this.props.match.params.post_id].id,
            timestamp: this.props.post[this.props.match.params.post_id].timestamp,
            title: this.state.postTitle,
            body: this.state.postContent,
            author: this.state.postAuthor,
            category: this.state.postCategory,
            voteScore: this.props.post[this.props.match.params.post_id].voteScore,
            deleted: this.props.post[this.props.match.params.post_id].deleted
        }
        this.props.dispatch(editPost(data, data.id))
    }

    deletePost = id => {
        this.props.dispatch(deletePost(id))
        this.props.history.push('/')
    }

    handleClickOpenConfirmation = () => {
        this.setState({ openDialogConfirmDelete: true });

    };

    handleCloseConfirmationDelete = (e) => {
        if (e.target.textContent === "Yes") {
            this.deletePost(this.state.postId);
        }

        this.setState({ openDialogConfirmDelete: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div style={{
                position: 'fixed',
                height: '80%',
                width: '100%',
                overflow: 'auto'
            }}>

                {this.props.post &&
                    Object.keys(this.props.post).map(
                        k =>
                            k === this.props.match.params.post_id &&
                            !this.props.post[k].deleted &&
                            <div key={k}>


                                <Typography variant="h5" gutterBottom>
                                    {this.props.post[k].title}
                                    <br />
                                    {' '}

                                    <Grid container spacing={24}>
                                        <Grid item xs={1} style={{ float: 'right' }}>
                                            {this.props.post[k].voteScore}{' '}
                                        </Grid>
                                        <div onClick={() => this.submitVote(k, 'upVote')}>
                                            <IconButton aria-label="Love this">
                                                <LikeIcon />
                                            </IconButton>
                                        </div>
                                        <div onClick={() => this.submitVote(k, 'downVote')}>
                                            <IconButton aria-label="Hate this">
                                                <UnlikeIcon />
                                            </IconButton>
                                        </div>
                                        <div onClick={() => this.handleClickOpenConfirmation(this.state.postId)}
                                            style={{ marginLeft: 0 }}>
                                            <IconButton aria-label="Delete">
                                                <Delete />
                                            </IconButton>
                                        </div>
                                    </Grid>

                                </Typography>

                                <Divider variant="middle" />
                                {
                                    this.state.postEditorVisible &&
                                    <div style={{ width: '20%', float: 'left' }}>

                                        <Typography variant="h6" gutterBottom></Typography>

                                        <form onSubmit={this.handlePostSubmit} className={classes.root}>

                                            <TextField
                                                id='post-title'
                                                label="Title"
                                                name='postTitle'
                                                className={classes.textField}
                                                value={this.state.postTitle}
                                                onChange={this.handleInputChange}
                                                margin="normal"
                                                variant="outlined"
                                                required
                                            />

                                            <TextField
                                                id='post-author'
                                                label="Author"
                                                name='postAuthor'
                                                className={classes.textField}
                                                value={this.state.postAuthor}
                                                onChange={this.handleInputChange}
                                                margin="normal"
                                                variant="outlined"
                                                required
                                            />

                                            <TextField
                                                id='post-content'
                                                label="Content"
                                                name='postContent'
                                                multiline
                                                rowsMax="4"
                                                className={classes.textField}
                                                value={this.state.postContent}
                                                onChange={this.handleInputChange}
                                                margin="normal"
                                                variant="outlined"
                                                required
                                            />
                                            <br />
                                            <div className={classes.selectAlign}>
                                                <Button variant="contained" type='submit' className={classes.button}>
                                                    Save
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                }

                                <div style={{ width: '400', float: 'left', marginLeft: 50 }}>
                                    <h2>
                                        Comments ({this.props.comments &&
                                            Object.values(this.props.comments).filter(comment => comment.parentId === this.state.postId).length})
                                        </h2>
                                    {this.props.comments &&
                                        Object.values(this.props.comments)
                                            .filter(comment => !comment.deleted)
                                            .filter(comment => comment.parentId === this.state.postId)
                                            .sort((a, b) => {
                                                switch (this.props.sortCommentsBy) {
                                                    case 'BY_SCORE_LOWEST':
                                                        return a.voteScore - b.voteScore
                                                    case 'BY_DATE_OLDEST':
                                                        return a.timestamp - b.timestamp
                                                    case 'BY_DATE_NEWEST':
                                                        return b.timestamp - a.timestamp
                                                    default:
                                                        return b.voteScore - a.voteScore
                                                }
                                            })
                                            .map(comment =>

                                                <EditComment
                                                    key={comment.id}
                                                    id={comment.id}
                                                    timestamp={comment.timestamp}
                                                    body={comment.body}
                                                    author={comment.author}
                                                    parentId={comment.parentId}
                                                    voteScore={comment.voteScore}
                                                    deleted={comment.deleted}
                                                    parentDeleted={comment.parentDeleted}
                                                />
                                            )}


                                    <div style={{ width: '30%' }}>
                                        <Typography variant="h6" gutterBottom>New comment</Typography>

                                        <form id="newcomment-form" onSubmit={this.handleSubmit} className={classes.root}>

                                            <TextField
                                                id='comment-author'
                                                label="Author"
                                                name='commentAuthor'
                                                className={classes.textField}
                                                value={this.state.commentAuthor}
                                                onChange={this.handleInputChange}
                                                margin="normal"
                                                variant="outlined"
                                                required
                                            />
                                            <TextField
                                                id='comment-content'
                                                label="Content"
                                                name='commentContent'
                                                className={classes.textField}
                                                value={this.state.commentContent}
                                                onChange={this.handleInputChange}
                                                margin="normal"
                                                variant="outlined"
                                                required
                                            />

                                            <div className={classes.selectAlign}>
                                                <Button variant="contained" type='submit' className={classes.button}>
                                                    Save
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                    <br />
                                </div>
                            </div>
                    )
                }

                <Dialog
                    open={this.state.openDialogConfirmDelete}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Delete this post?"}</DialogTitle>
                    <DialogActions>
                        <Button id="delete-no" onClick={this.handleCloseConfirmationDelete} color="primary">
                            No
                        </Button>
                        <Button id="delete-yes" onClick={this.handleCloseConfirmationDelete} color="primary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>

            </div >
        )
    }
}

const mapStateToProps = state => ({
    post: state.postsById,
    comments: state.receiveComments,
    sortCommentsBy: state.setCommentSorting ? state.setCommentSorting.sort : ''
})

const mapDispatchToProps = dispatch => ({
    dispatch,
    fetchData: (id, sortCriteria) =>
        dispatch(fetchPost(id))
            .then(() => dispatch(fetchComments(id)))
            .then(() => dispatch(setCommentSorting(sortCriteria)))
})

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(PostDetail)
