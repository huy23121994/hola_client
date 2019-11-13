import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { authentication } from "../../service/app.service";
import { login, getUserInfo } from "../../service/auth";
import { connect } from "../../connect";

class Login extends Component {
  state = {
    error: ""
  };

  idRef = React.createRef();

  componentDidMount() {
    if (this.idRef.current) {
      this.idRef.current.focus();
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let email = formData.get("email");
    let password = formData.get("password");
    login(email, password).catch(e => {
      this.setState({ error: e.message });
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const redirectToReferrer = this.props.isAuthenticated;
    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    if (this.props.authenticating) {
      return null;
    }

    return (
      <div className="row">
        <div className="col-6 offset-3">
          <h2 className="text-center mb-5">Login</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                ref={this.idRef}
                name="email"
                type="text"
                className="form-control"
                placeholder="email@example.com"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            {this.state.error && (
              <div className="text-danger mb-5">{this.state.error}</div>
            )}
            <button type="submit" className="btn btn-primary">
              Log in
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  Login,
  authentication
);
