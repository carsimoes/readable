//React / Redux
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import compose from 'recompose/compose'

//Actions
import { fetchPosts, vote, deletePost } from '../actions/Post/actions'
import { setSorting } from '../actions/Sort/actions'

//Material-ui
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import UnlikeIcon from '@material-ui/icons/ThumbDown'
import LikeIcon from '@material-ui/icons/ThumbUp'
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import Badge from '@material-ui/core/Badge';
import MessageIcon from '@material-ui/icons/Message';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

//Components
import NavCategories from '../components/NavCategories'

const uuidv1 = require('uuid/v1')

const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },

    root: {
        flexGrow: 1,
    },
    paperLeft: {
        height: 100,
        width: 350,
    },
    paperMiddle: {
        height: 100,
        width: 350,
    },
    paperRight: {
        height: 100,
        width: 350,
        float: 'right',
        position: 'static'
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    padding: {
        padding: `0 ${theme.spacing.unit * 1}px`,
    },
});

/*
The view can subscribe to those events and update itself accordingly.
*/

class Home extends Component {

    state = {
        openDialogConfirmDelete: false,
        postIdToDelete: ''
    }

    componentWillMount() {
        this.props.fetchData('BY_SCORE_HIGHEST')
    }

    submitVote = (id, voteType) => {
        this.props.dispatch(vote(id, voteType))
    }

    deletePost = id => {
        this.props.dispatch(deletePost(id))
    }

    handleClickOpenConfirmation = (id) => {
        this.setState({ openDialogConfirmDelete: true });
        this.setState({ postIdToDelete: id });
    };

    handleCloseConfirmationDelete = (e) => {
        if (e.target.textContent === "Yes") {
            this.deletePost(this.state.postIdToDelete)
        }

        this.setState({ openDialogConfirmDelete: false });
    };

    render() {
        const { classes } = this.props;

        let posts = this.props.posts;
        let category = this.props.location.pathname.substring(1);
        if (category !== '') {
            posts = [];
            posts = Object.values(this.props.posts).filter(
                post => post.category === category
            )
        }

        return (

            <div className="">

                <div className="b1"></div>
                <div className="b2" >
                    {posts &&
                        Object.values(posts)
                            .filter(post => !post.deleted)
                            .sort((a, b) => {
                                switch (this.props.sortBy) {
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
                            .map(post =>
                                <div className='post' key={uuidv1()}>
                                    <Card className={classes.card}>
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="Recipe" className={classes.avatar}>
                                                    {post.category && post.category.charAt(0).toUpperCase() + post.category.charAt(1)}
                                                </Avatar>
                                            }
                                            action={
                                                <IconButton>
                                                </IconButton>
                                            }
                                            title={post.title}
                                            subheader={post.category}
                                        />

                                        <CardContent>
                                            <Typography component="p">
                                                Author: {post.author}
                                            </Typography>
                                            <br />
                                            <br />

                                        </CardContent>
                                        <CardActions className={classes.actions} disableActionSpacing>
                                            {post.voteScore}
                                            <div onClick={() => this.submitVote(post.id, 'upVote')}>
                                                <IconButton aria-label="Love this">
                                                    <LikeIcon />
                                                </IconButton>
                                            </div>
                                            <div onClick={() => this.submitVote(post.id, 'downVote')}>
                                                <IconButton aria-label="Hate this">
                                                    <UnlikeIcon />
                                                </IconButton>
                                            </div>

                                            <Link
                                                to={{
                                                    pathname: `/${post.category}/${post.id}`,
                                                    state: { postEditorVisible: true }
                                                }}
                                                style={{ marginLeft: 25 }}>
                                                <Badge color="primary" badgeContent={post.comments && post.comments.length} className={classes.margin}>
                                                    <MessageIcon />
                                                </Badge>
                                            </Link>

                                            <Link
                                                to={{
                                                    pathname: `/${post.category}/${post.id}`,
                                                    state: { postEditorVisible: true }
                                                }}
                                                style={{ marginLeft: 25 }}>
                                                <IconButton aria-label="Edit">
                                                    <Edit />
                                                </IconButton>
                                            </Link>

                                            <div onClick={() => this.handleClickOpenConfirmation(post.id)}
                                                style={{ marginLeft: 0 }}>
                                                <IconButton aria-label="Delete">
                                                    <Delete />
                                                </IconButton>
                                            </div>
                                        </CardActions>
                                    </Card>
                                    <br />
                                </div>
                            )}
                </div>
                <div className="b3">
                    <NavCategories sortBy={this.props.sortBy} />
                </div>

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

            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.postsById,
    sortBy: state.setSorting ? state.setSorting.sort : ''
})

const mapDispatchToProps = dispatch => ({
    dispatch,
    fetchData: sortCriteria =>
        dispatch(fetchPosts()).then(() => dispatch(setSorting(sortCriteria)))
})

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Home)