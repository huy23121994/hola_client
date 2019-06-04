import React, { Component, Fragment} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from '../connect';
import Profile from './Profile';
import { userInfo, authentication } from '../service/app.service';
import Setting from './Setting';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

class Main extends Component{

  constructor(){
    super()
    this.checkAuthentication()
  }

  checkAuthentication = () => {
    let token = localStorage.getItem('authToken')
    if(token){
      authentication.update({token: token})
      Promise.resolve({userName: 'Tran Bao Huy'}).then(data => {
        console.log(data);
      })
      console.log(authentication)
      console.log(userInfo)
    }
  }

  render(){
    console.log(window.location.pathname)
    let user = userInfo.data
    let token = authentication.data.token
    return(
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
          <li>
            <Link to="/login">Login</Link>
          </li>
          <Route exact path="/" component={() => <h3>Home Page</h3>} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/setting" component={Setting} />
          <Route path="/login" component={Login} />
        </ul>
      </Router>
    )
  }
}

export default connect(Main, userInfo);