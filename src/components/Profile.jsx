import React, { Component } from 'react';
import { connect } from '../connect';
import { userInfo } from '../service/app.service';

class Profile extends Component{
  render(){
    console.log(userInfo.data)
    return(
      <div>
        <h3>Profile Page</h3>
      </div>
    )
  }
}

export default connect(Profile, userInfo)