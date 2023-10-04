import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/session';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = props => {
  const user = useSelector(userSelector);

  return (
    <Route {...props}>
      {(user)? props.children  : <Redirect to='/login' />}
    </Route>
  );
};


export default ProtectedRoute;
