import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Components
import NotFound from '../components/ErrorNotFound'
import Home from '../views/Home'
import Bar from '../components/Bar'
import Footer from '../components/Footer'

//Views
import PostDetail from '../views/PostDetail'
import CreatePost from '../views/CreatePost'
import TrendingNow from '../views/TrendingNow'

//Css
import '../css/index.css'

class App extends Component {

  render() {
    return (
      <Router>
        <Fragment>
          <div className='container'>

            <Bar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/Home" exact component={Home} />
              <Route path='/create-post' exact component={CreatePost} />
              <Route path='/:category/:post_id' exact component={PostDetail} />
              <Route path='/trending-now' exact component={TrendingNow} />
              <Route path='/:category' exact component={Home} />
              <Route component={NotFound} />
            </Switch>
          </div>

          <Footer />
        </Fragment>
      </Router>
    );
  }
}

export default connect(null, null)(App)