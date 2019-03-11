import React from 'react';
import { Link } from 'react-router-dom'

//Material ui
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

//Components
import NewPost from '../components/NewPost'
import TrendingNowButton from '../components/TrendingNowButton'

const styles = {
    root: {
        flexGrow: 1,
    },
    newPost: {
        marginLeft: 100,
    }
};

function Bar(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h4" color="inherit">
                        <Link to='/'>Readable</Link>
                    </Typography>

                    <Typography className={classes.newPost}>
                        <NewPost></NewPost>
                    </Typography>

                    <Typography className={classes.newPost}>
                        <TrendingNowButton></TrendingNowButton>
                    </Typography>

                </Toolbar>
            </AppBar>
            <br />
        </div>
    );
}

export default withStyles(styles)(Bar);