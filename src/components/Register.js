import { useContext, useEffect } from 'react';
import { HeaderLinkContext } from '../contexts/HeaderLinkContext';
import AuthForm from './AuthForm';

const Register = (props) => {
  const { changeLinkTextContext, changeLinkPathContext } =
    useContext(HeaderLinkContext);

  const { onFormReset } = props;

  useEffect(() => {
    onFormReset();
    changeLinkTextContext('Sign in');
    changeLinkPathContext('/signin');
  }, [changeLinkTextContext, changeLinkPathContext]);

  return (
    <AuthForm
      name='signUp'
      title='Sign Up'
      submitButtonTitle='Sign Up'
      link='/signin'
      linkText='Already a member? Log in here!'
      email={props.email}
      password={props.password}
      onEmailChange={props.onEmailChange}
      onPasswordChange={props.onPasswordChange}
      onSubmit={props.onRegister}
    />
  );
};

export default Register;
