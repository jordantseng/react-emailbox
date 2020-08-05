import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkAuth } from '../actions';
import history from '../history';

import NavBar from './NavBar';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import Inbox from '../pages/Inbox';
import NotFound from '../pages/NotFound';

class App extends Component {
  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    return (
      <Router history={history}>
        <div className="ui container">
          <NavBar />
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/signout" component={Signout} />
            <Route
              path="/inbox"
              render={routeProps =>
                !this.props.user.authenticated ? (
                  <Redirect to="/" />
                ) : (
                  <Inbox {...routeProps} />
                )
              }
            />
            <Route path="/not-found" component={NotFound} />
            <Route exact path="/" component={Signin} />
            <Redirect to="not-found" />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

const mapDispatchToProps = {
  checkAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
