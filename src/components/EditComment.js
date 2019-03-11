import React, { Component } from 'react'
import { connect } from 'react-redux'
import compose from 'recompose/compose'

//Actions
import { addComment, voteComment, deleteComment } from '../actions/Comment/actions'

//Material UI
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import TextField from '@material-ui/core/TextField';
import UnlikeIcon from '@material-ui/icons/ThumbDown'
import LikeIcon from '@material-ui/icons/ThumbUp'


const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class EditComment extends Component {

    state = {
        commentAuthor: '',
        commentContent: '',
        showEditor: false
    }

    componentDidMount() {
        this.setState({
            commentAuthor: this.props.author,
            commentContent: this.props.body
        })
    }

    submitVote = (id, voteType) => {
        this.props.dispatch(voteComment(id, voteType))
    }

    handleDelete = id => {
        this.props.dispatch(deleteComment(id))
    }

    handleInputChange = event => {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    handleEditSubmit = event => {
        event.preventDefault()
        const data = {
            id: this.props.id,
            timestamp: this.props.timestamp,
            body: this.state.commentContent,
            author: this.state.commentAuthor,
            parentId: this.props.parentId,
            voteScore: this.props.voteScore,
            deleted: this.props.deleted,
            parentDeleted: false
        }

        this.props.dispatch(addComment(data))
    }

    beginEdit = () => {
        this.setState({
            showEditor: true
        })
    }

    render() {
        const { classes } = this.props;

        return (

            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <div key={this.props.id}>

                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                By: {this.props.author}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {new Date(this.props.timestamp).toDateString()}
                            </Typography>
                            <Typography component="p">
                                {this.props.body}{' '}
                                <br />
                                <br />
                                <br />
                            </Typography>
                            <CardActions>
                                <IconButton aria-label="Edit" onClick={this.beginEdit}>
                                    <Edit />
                                </IconButton>
                                <div onClick={() => this.handleDelete(this.props.id)}>
                                    <IconButton aria-label="Delete">
                                        <Delete />
                                    </IconButton>
                                </div>
                                <div>
                                    {this.props.voteScore}{' '}

                                    <IconButton aria-label="Love this" onClick={() => this.submitVote(this.props.id, 'upVote')}>
                                        <div >
                                            <LikeIcon />
                                        </div>
                                    </IconButton>
                                    <IconButton aria-label="Love this" onClick={() => this.submitVote(this.props.id, 'downVote')}>
                                        <div >
                                            <UnlikeIcon />
                                        </div>
                                    </IconButton>
                                </div>

                            </CardActions>

                            {this.state.showEditor &&

                                <form onSubmit={this.handleEditSubmit} className={classes.root}>
                                    <div style={{ width: 270, float: 'left', marginRight: 0 }}>
                                        <TextField
                                            id='comment-author'
                                            label="Author"
                                            name='commentAuthor'
                                            className={classes.textField}
                                            value={this.state.commentAuthor}
                                            onChange={this.handleInputChange}
                                            margin="normal"
                                            variant="outlined"
                                            required='required'
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
                                            required='required'
                                            multiline
                                            rowsMax="4"
                                            fullWidth
                                        />

                                        <div className={classes.selectAlign}>
                                            <Button variant="contained" type='submit' className={classes.button}>
                                                Save Comment
                                            </Button>
                                        </div>
                                        <br />
                                    </div>
                                </form>
                            }
                        </div>
                    </CardContent>

                </Card>
                <br />
            </div>
        )
    }
}

export default compose(
    withStyles(styles),
    connect()
)(EditComment)
