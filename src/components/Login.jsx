import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { authentication, userInfo } from '../service/app.service';
import { connect } from '../connect';

class Login extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    setTimeout( _ => {
      let newToken = 'xxx'
      authentication.update({token: newToken})
      localStorage.setItem('authToken', newToken)
    }, 1000)
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = false

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <div className="row">
        <div className="col-6">
          <h2>Login</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input id="email" type="text" className="form-control" placeholder="email@example.com" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input id="password" type="password" className="form-control" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Log in</button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(Login, authentication);