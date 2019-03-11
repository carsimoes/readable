import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { Link } from 'react-router-dom'

//Material-ui
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
});

class NewPost extends React.Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <Link to='/create-post'>
                <Button variant="contained" className={classes.button}>
                    Create a new post
                    </Button>
            </Link>
        );
    }
}

NewPost.propTypes = {
    classes: PropTypes.object.isRequired,
};

const NewPostlWrapped = compose(
    withStyles(styles),
    connect()
)(NewPost);

export default NewPostlWrapped;