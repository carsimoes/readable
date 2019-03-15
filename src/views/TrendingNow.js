//React / Redux
import React, { Component } from 'react'
import { connect } from 'react-redux'
import compose from 'recompose/compose'

//Actions
import { fetchPosts, } from '../actions/Post/actions'
import { setSorting } from '../actions/Sort/actions'
import { categories } from '../actions/Category/actions'

//Material-ui
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

//react-google-charts
import Chart from "react-google-charts";

const styles = theme => ({

});

const pieOptions = {
    title: "Posts",
    pieHole: 1.9,
    slices: [
        {
            color: "#2BB673"
        },
        {
            color: "#d91e48"
        },
        {
            color: "#007fad"
        },
        {
            color: "#e9a227"
        }
    ],
    legend: {
        position: "bottom",
        alignment: "center",
        textStyle: {
            color: "233238",
            fontSize: 14
        }
    },
    tooltip: {
        showColorCode: true
    },
    chartArea: {
        left: 0,
        top: 10,

        width: "100%",
        height: "75%"
    },
    fontName: "Roboto"
};

/*
The view can subscribe to those events and update itself accordingly.
*/

class TrendingNow extends Component {
    state = {
        chartImageURI: "",
        arrayChartPosts: []
    };

    componentWillMount() {
        this.props.fetchData()
        this.props.fetchDataPosts('BY_SCORE_HIGHEST')
    }

    render() {

        let rowsChartPosts = [["Category", "Posts"]];

        if (this.props.categories !== null && Object.values(this.props.posts).length > 0) {
            this.props.categories.map(category =>
                rowsChartPosts.push([category.name, Object.values(this.props.posts)
                    .filter(post => !post.deleted)
                    .filter(
                        post => post.category === category.name
                    ).length])
            );
        }

        let rowsChartComments = [["Category", "Comments"]];
        if (this.props.categories !== null && Object.values(this.props.posts).length > 0) {
            let countCommentsByCategory = 0;

            this.props.categories.map(category =>
                rowsChartComments.push([category.name, 0])
            );

            Object.values(this.props.categories).forEach(category => {
                Object.values(this.props.posts)
                    .filter(post => !post.deleted)
                    .filter(
                        post => post.category === category.name
                    ).forEach(postElement => {
                        countCommentsByCategory += postElement.commentCount
                    })

                rowsChartComments.push([category.name, countCommentsByCategory])
                countCommentsByCategory = 0;
            });
        }

        return (

            <div style={{
                width: '100%',
                height: '100%',
                float: 'left',

            }}>

                <div className="container">
                    <div className="b1-trends">
                    </div>
                    <div className="b2-trends">
                        <Typography variant="h6" gutterBottom className='chartBoxTitle'>Posts Trends for you</Typography>
                        <Chart
                            chartType="PieChart"
                            data={rowsChartPosts}
                            options={pieOptions}
                            graph_id="PieChart1"
                            width={"100%"}
                            height={"350px"}
                            legend_toggle
                            className='chartBox'
                        />
                    </div>
                    <div className="b1-trends">


                    </div>
                    <div className="b2-trends">
                        <Typography variant="h6" gutterBottom className='chartBoxTitle'>Comments Trends for you</Typography>
                        <div className="b2-trends-chart2">
                            <Chart
                                chartType="PieChart"
                                data={rowsChartComments}
                                options={pieOptions}
                                graph_id="PieChart2"
                                width={"100%"}
                                height={"350px"}
                                legend_toggle
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.receiveCategories,
    posts: state.postsById,
})

const mapDispatchToProps = dispatch => ({
    dispatch,
    fetchData: () => dispatch(categories()),
    fetchDataPosts: sortCriteria =>
        dispatch(fetchPosts()).then(() => dispatch(setSorting(sortCriteria)))
})

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(TrendingNow)