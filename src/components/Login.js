import { useContext, useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { HeaderLinkContext } from '../contexts/HeaderLinkContext';
import * as auth from '../utils/auth';
import AuthForm from './AuthForm';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const { setIsLoggedIn } = useContext(AuthContext);

  const { changeLinkTextContext, changeLinkPathContext } =
    useContext(HeaderLinkContext);

  useEffect(() => {
    changeLinkTextContext('Sign up');
    changeLinkPathContext('/signup');
  }, [changeLinkPathContext, changeLinkTextContext]);

  const handleLogin = (event) => {
    event.preventDefault();
    auth
      .authorize(email, password)
      .then((data) => {
        if (!email || !password) {
          throw new Error('One or more of the fields were not provided');
        }
        if (!data) {
          throw new Error('Incorrect email address or password');
        } else {
          setIsLoggedIn(true);
        }
      })
      .then(() => {
        history.push('/users/me');
      })
      .catch((err) => console.log(err));
  };

  return (
    <AuthForm
      name='log in'
      title='Log in'
      submitButtonTitle='Log In'
      link='/signup'
      linkText='Not a member yet? Sign up here!'
      email={email}
      password={password}
      onEmailChange={(event) => setEmail(event.target.value)}
      onPasswordChange={(event) => setPassword(event.target.value)}
      onSubmit={(event) => handleLogin(event)}
    />
  );
};

export default withRouter(Login);
