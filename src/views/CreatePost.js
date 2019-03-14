import React, { Component } from 'react'
import { connect } from 'react-redux'
import compose from 'recompose/compose'

//Actions
import { addPost } from '../actions/Post/actions'

//Material ui
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

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

class CreatePost extends Component {
    state = {
        postTitle: '',
        postAuthor: '',
        postCategory: 'react',
        postContent: ''
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
            title: this.state.postTitle,
            body: this.state.postContent,
            author: this.state.postAuthor,
            category: this.state.postCategory,
            voteScore: 0,
            deleted: false
        }
        this.props.dispatch(addPost(data))
        this.props.history.push('/')
    }

    render() {
        const { classes } = this.props;

        return (
<div>

             {/* <div style={{ width: '100%', height: '100%', float: 'left', position: 'fixed', background: 'white' }}> */}
            {/* <div style={{ width: '15%', float: 'left', marginLeft: 500, position: 'fixed' }}> */ }
            < FormControl className = { classes.formControl } >
                <Typography variant="h6" gutterBottom>Compose new Post</Typography>
                <form onSubmit={this.handleSubmit} className={classes.root}>
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
                    <div className={classes.selectAlign}>
                        <InputLabel htmlFor="post-category"></InputLabel>
                        <Select
                            name='postCategory'
                            id='post-category'
                            value={this.state.postCategory}
                            onChange={this.handleInputChange}
                            required>
                            <MenuItem value='react'>React</MenuItem>
                            <MenuItem value='redux'>Redux</MenuItem>
                            <MenuItem value='udacity'>Udacity</MenuItem>
                        </Select>
                    </div>
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
                            Post
                                </Button>
                    </div>
                </form>
                </ FormControl >
            // </div >
            // </div >

        )
    }
}

export default compose(
    withStyles(styles),
    connect()
)(CreatePost)