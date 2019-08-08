import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { connect } from '../connect';
import Profile from './Profile';
import { authentication } from '../service/app.service';
import Setting from './Setting';
import Login from './Auth/Login';
import PrivateRoute from './Auth/PrivateRoute';

class Main extends Component {

  handleLogout = () => {
    authentication.update({ isAuthenticated: false })
  }

  render() {
    let isAuthenticated = authentication.data.isAuthenticated
    return (
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/setting">Setting</Link>
          </li>
          {isAuthenticated ?
            <li>
              <a href="#" onClick={this.handleLogout}>Logout</a>
            </li>
            :
            <li>
              <Link to="/login">Login</Link>
            </li>
          }
          <Route exact path="/" component={() => <h3>Home Page</h3>} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/setting" component={Setting} />
          <Route path="/login" component={Login} />
        </ul>
      </Router>
    )
  }
}

export default connect(Main, authentication);