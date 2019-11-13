import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { connect } from "../connect";
import Profile from "./Profile";
import { authentication } from "../service/app.service";
import Setting from "./Setting";
import Login from "./Auth/Login";
import PrivateRoute from "./Auth/PrivateRoute";
import Logout from "./Auth/Logout";
import { getUserInfo } from "../service/auth";

class Main extends Component {
  state = {
    authenticating: false
  };

  componentDidMount() {
    let token = window.localStorage.getItem("auth_token");
    if (token) {
      this.setState({ authenticating: true });
      getUserInfo().then(() => {
        this.setState({ authenticating: false });
      });
    }
  }

  render() {
    let isAuthenticated = authentication.data.isAuthenticated;
    let { authenticating } = this.state;
    return (
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/setting">
                  Setting
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              {isAuthenticated ? (
                <li className="nav-item">
                  <Route path="/" component={Logout} />
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
        <div className="container-fluid mt-4">
          <Route exact path="/" component={() => <h3>Home Page</h3>} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/setting" component={Setting} />
          <Route
            path="/login"
            render={props => (
              <Login
                {...props}
                isAuthenticated={isAuthenticated}
                authenticating={authenticating}
              />
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  Main,
  authentication
);
