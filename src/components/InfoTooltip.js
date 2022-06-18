import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Popup from './Popup';

const InfoTooltip = ({ isOpen, onClose }) => {
  const { isRegistered } = useContext(AuthContext);

  return (
    <Popup
      name='infoTooltip'
      containerName='popup__container'
      isOpen={isOpen}
      onClose={onClose}
    >
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
    </Popup>
  );
};

export default InfoTooltip;
