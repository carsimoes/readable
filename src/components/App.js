import React, { Component, Fragment } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'

//Views
import Home from '../views/Home'
import PostDetail from '../views/PostDetail'
import CreatePost from '../views/CreatePost'
import TrendingNow from '../views/TrendingNow'

//Components
import Bar from '../components/Bar'

class App extends Component {

  render() {
    return (
      <BrowserRouter >
        <Fragment>
          <LoadingBar />
          <div className='container' >
            <Bar />
            {this.props.loading === true ? null : <div>
              <Route path='/' exact component={Home} />
              <Route exact path='/:category' component={Home} />
              <Route path='/create-post' component={CreatePost} />
              <Route path='/:category/:post_id' component={PostDetail} />
              <Route path='/trending-now' component={TrendingNow} />
            </div>}
          </div>
        </Fragment>
      </BrowserRouter>
    )
  }
}

export default connect()(App)