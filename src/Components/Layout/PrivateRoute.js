import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Loader from 'Components/Shared/Loader';

const PrivateRoute = ({ component: RouteComponent, ...props }) => {
  const role = useSelector((state) => state.auth.authenticated?.role);
  const isFetching = useSelector((state) => state.auth.isFetching);
  const error = useSelector((state) => state.auth.error);

  return (
    <Route
      {...props}
      render={(routeProps) => {
        <Loader isLoading={isFetching} />;
        if (props.role.includes(role)) {
          return <RouteComponent {...routeProps} />;
        }
        if (role && !error) {
          return <Redirect to={'/auth/notAllowed'} />;
        }
        return <Redirect to={'/login'} />;
      }}
    />
  );
};

export default PrivateRoute;
