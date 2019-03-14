import React from 'react';
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

class TrendingNowButton extends React.Component {

    render() {
        const { classes } = this.props;

        return (

            <Link to='/trending-now'>
                <Button variant="contained" className={classes.button}>
                    Trending Now
                    </Button>
            </Link>

        );
    }
}

const TrendingNowButtonWrapped = compose(
    withStyles(styles),
    connect()
)(TrendingNowButton);

export default TrendingNowButtonWrapped;