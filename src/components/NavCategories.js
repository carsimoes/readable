import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import compose from 'recompose/compose'

//Actions
import { categories } from '../actions/Category/actions'

//Material Ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const styles = theme => ({
    root: {
        display: 'flex',
        float: 'right',
    },
    paper: {
        marginRight: theme.spacing.unit * 2,
    }
});

const uuidv1 = require('uuid/v1')

class NavCategories extends Component {

    componentWillMount() {
        this.props.fetchData()
    }

    render() {
        const { classes } = this.props;

        return (
            <div>

                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <MenuList >
                            <Link to='/'>
                                <MenuItem>
                                    All
                            </MenuItem>
                            </Link>
                            {this.props.categories &&
                                this.props.categories.length > 0 &&
                                this.props.categories.map(category =>
                                    <Link key={uuidv1()} to={`/${category.name}`}>
                                        <MenuItem key={category.path}>
                                            {category.name}
                                        </MenuItem>
                                    </Link>
                                )
                            }
                        </MenuList>
                    </Paper>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.receiveCategories
})

const mapDispatchToProps = dispatch => ({
    dispatch,
    fetchData: () => dispatch(categories())
})

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(NavCategories)