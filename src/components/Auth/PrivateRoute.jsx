import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from '../../connect';
import { authentication } from '../../service/app.service';

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={(props) => (
      authentication.data.isAuthenticated
        ? <Component {...props} />
        : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
    )} />
  )
}
export default connect(PrivateRoute, authentication);