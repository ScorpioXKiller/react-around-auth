import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ path, component: Component, ...props }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Route path={path}>
      {isLoggedIn ? <Component {...props} /> : <Redirect to='./signin' />}
    </Route>
  );
};

export default ProtectedRoute;
