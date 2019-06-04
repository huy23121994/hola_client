import React, { Component } from 'react';
import { connect } from '../connect';
import { userInfo } from '../service/app.service';

class Setting extends Component{
  render(){
    return(
      <div>
        <h3>Setting Page</h3>
      </div>
    )
  }
}

export default connect(Setting, userInfo)