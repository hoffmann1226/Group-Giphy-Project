import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Search from '../Search/Search';

import Favorites from './../Favorites/Favorites'

class App extends Component {

  render() {
    return (
      <Router>
        <nav>
          <Link to = "/Favorites">
             <Button color = "primary"> Favorites </Button>
          </Link>
          {'\u00A0'}{'\u00A0'}
          <Link to = "/">
             <Button color = "primary"> Gif Search </Button>
          </Link>
        </nav>
      <div>
        <h1>Giphy Search!</h1>
        <Route exact path="/" component={Search}/>
        <Route exact path="/Favorites" component={Favorites}/>
      </div>
      </Router>
    );
  }

}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(App);
