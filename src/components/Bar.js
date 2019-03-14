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

import '../css/quoteBar.css'

const styles = {
    root: {
        flexGrow: 1,

    },
    newPost: {
        marginLeft: 100,
    },
    AppBarNew: {
        backgroundColor: 'rgba(74, 78, 73, 0.87)'
    },
    AppBarNewTitle: {
        color: 'white !important'
    }
};

//https: //codepen.io/FUGU22/pen/YxEojN
//cards: https://codepen.io/ariona/pen/LEEadb/

function Bar(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.AppBarNew}>
                <Toolbar>

                    <Typography variant="h4" >
                        <Link to='/' className={classes.AppBarNewTitle}>Readable</Link>
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