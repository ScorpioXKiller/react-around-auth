import { useContext, useEffect } from 'react';
import { HeaderLinkContext } from '../contexts/HeaderLinkContext';
import AuthForm from './AuthForm';

const Login = (props) => {
  const { changeLinkTextContext, changeLinkPathContext } =
    useContext(HeaderLinkContext);

  const { onFormReset } = props;

  useEffect(() => {
    onFormReset();
    changeLinkTextContext('Sign up');
    changeLinkPathContext('/signup');
  }, [changeLinkPathContext, changeLinkTextContext]);

  return (
    <AuthForm
      name='log in'
      title='Log in'
      submitButtonTitle='Log In'
      link='/signup'
      linkText='Not a member yet? Sign up here!'
      email={props.email}
      password={props.password}
      onEmailChange={props.onEmailChange}
      onPasswordChange={props.onPasswordChange}
      onSubmit={props.onLogin}
    />
  );
};

export default Login;
