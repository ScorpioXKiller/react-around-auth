import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Footer from './Footer';

const ProtectedRoute = ({ path, component: Component, ...props }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Route path={path}>
      {isLoggedIn ? <Component {...props} /> : <Redirect to='./signin' />}
      <Footer />
    </Route>
  );
};

export default ProtectedRoute;
