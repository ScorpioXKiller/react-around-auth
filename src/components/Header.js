import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import logo from '../images/logo.svg';

const Header = (props) => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='Logo' />
      <nav
        style={!isLoggedIn ? { display: 'block', margin: '0 30px 0 0' } : {}}
        className='navbar'
      >
        <span className='navbar__user-email'>{props.userEmail}</span>
        {!isLoggedIn ? (
          <Link to={props.link} className='navbar__auth-link'>
            {props.linkText}
          </Link>
        ) : (
          <Link
            to={props.link}
            className='navbar__auth-link'
            onClick={props.onSignOut}
          >
            {props.linkText}
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
