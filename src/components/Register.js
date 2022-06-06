import { useContext, useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { HeaderLinkContext } from '../contexts/HeaderLinkContext';
import * as auth from '../utils/auth';
import AuthForm from './AuthForm';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const { changeLinkTextContext, changeLinkPathContext } =
    useContext(HeaderLinkContext);

  const { setIsRegistered } = useContext(AuthContext);

  useEffect(() => {
    changeLinkTextContext('Sign in');
    changeLinkPathContext('/signin');
  }, [changeLinkTextContext, changeLinkPathContext]);

  const handleRegister = (event) => {
    event.preventDefault();
    auth
      .register(email, password)
      .then((res) => {
        props.onInfoTooltipOpen(true);
        if (!res) {
          console.log('One of the fields was filled in incorrectly');
          setIsRegistered(false);
        } else {
          setIsRegistered(true);
          history.push('/signin');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <AuthForm
      name='signUp'
      title='Sign Up'
      submitButtonTitle='Sign Up'
      link='/signin'
      linkText='Already a member? Log in here!'
      email={email}
      password={password}
      onEmailChange={(event) => setEmail(event.target.value)}
      onPasswordChange={(event) => setPassword(event.target.value)}
      onSubmit={handleRegister}
    />
  );
};

export default withRouter(Register);
