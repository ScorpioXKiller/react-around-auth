import { Link } from 'react-router-dom';

const AuthForm = ({email, password, ...props}) => {
  return (
    <div className='auth'>
      <h2 className='auth__title'>{props.title}</h2>

      <form
        className='auth-form'
        name={props.name}
        noValidate
        onSubmit={props.onSubmit}
      >
        <label htmlFor='email' className='auth-form__field'>
          <input
            type='email'
            className='auth-form__input auth__input_el_user-email'
            id='email-input'
            name='email'
            placeholder='Email'
            required
            value={email}
            onChange={props.onEmailChange}
          />
          <span className='form__input-error email-input-error'></span>
        </label>

        <label htmlFor='password' className='auth-form__field'>
          <input
            type='password'
            className='auth-form__input auth__input_el_user-password'
            id='password-input'
            name='password'
            placeholder='Password'
            required
            minLength='6'
            maxLength='10'
            value={password}
            onChange={props.onPasswordChange}
          />
          <span className='form__input-error about-input-error'></span>
        </label>

        <button
          className='button auth-form__submit-button'
          type='submit'
          title='Submit'
        >
          {props.submitButtonTitle}
        </button>
      </form>

      <Link to={props.link} className='auth__link'>
        {props.linkText}
      </Link>
    </div>
  );
};

export default AuthForm;
