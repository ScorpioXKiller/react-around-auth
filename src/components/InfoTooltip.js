import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const InfoTooltip = (props) => {
  const { isRegistered } = useContext(AuthContext);

  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen && 'popup_visible'
      }`}
    >
      <div className='popup__page-overlay' onClick={props.onClose}></div>

      <div className='popup__container'>
        <button
          className='button popup__close-button'
          type='button'
          title='Close'
          aria-label='close'
          onClick={props.onClose}
        ></button>

        <div
          className={`popup__info-icon ${
            isRegistered ? 'popup__info-icon_success' : 'popup__info-icon_fail'
          }`}
        ></div>

        <h2 className='popup__title info-tooltip-title'>
          {isRegistered
            ? 'Success! You have now been registered.'
            : 'Oops, something went wrong! Please try again.'}
        </h2>
      </div>
    </section>
  );
};

export default InfoTooltip;
