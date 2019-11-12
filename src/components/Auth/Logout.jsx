import React, { Component } from "react";
import { authentication } from "../../service/app.service";
import { clearAuthStorage } from "../../service/auth";

class Logout extends Component {
  handleLogout = () => {
    authentication.update({ isAuthenticated: false });
    clearAuthStorage();
    this.props.history.push("/login");
  };

  render() {
    return (
      <span className="nav-link pointer" onClick={this.handleLogout}>
        Logout
      </span>
    );
  }
}
export default Logout;
