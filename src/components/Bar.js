import React from 'react';
import { Link } from 'react-router-dom'

//Material ui
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import '../css/quoteBar.css'

const styles = {
    root: {
        flexGrow: 1,

    },
    newPost: {
        marginLeft: 100,
    },
    AppBarNew: {
        backgroundColor: 'rgba(74, 78, 73, 0.87)',
        minHeight: '35px',
    },

    AppBarNewTitle: {
        color: 'white !important'
    }
};

const ITEM_HEIGHT = 48;

class Bar extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.AppBarNew}>
                    <Toolbar className='AppBarNewToolBar'>

                        <div>
                            <IconButton
                                aria-label="More"
                                aria-owns={open ? 'long-menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleClick}>
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="long-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={this.handleClose}
                                PaperProps={{
                                    style: {
                                        maxHeight: ITEM_HEIGHT * 4.5,
                                        width: 200,
                                    },
                                }}>

                                <MenuItem key='home' onClick={this.handleClose}>
                                    <Link to='/'>
                                        Home
                                        </Link>
                                </MenuItem>

                                <Link to='/create-post'>
                                    <MenuItem key='createPost' onClick={this.handleClose}>
                                        Create a new post
                                    </MenuItem>
                                </Link>
                                <Link to='/trending-now'>
                                    <MenuItem key='createPost' onClick={this.handleClose}>
                                        Trending Now
                                    </MenuItem>
                                </Link>

                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                <br />
            </div>
        );
    }
}




export default withStyles(styles)(Bar);