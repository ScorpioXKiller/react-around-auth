import { useEffect, useState } from 'react';
import Popup from './Popup';

const ImagePopup = ({ selectedCard, onClose }) => {
  const [popupImageLink, setPopupImageLink] = useState('');
  const [popupImageTitle, setPopupImageName] = useState('');

  useEffect(() => {
    if (selectedCard.isCardOpen) {
      setPopupImageLink(selectedCard.link);
      setPopupImageName(selectedCard.title);
    }
  }, [selectedCard]);

  return (
    <Popup
      name='imagePopup'
      containerName='card-popup__container'
      isOpen={selectedCard.isCardOpen}
      onClose={onClose}
    >
      <img className='card-popup__image' src={popupImageLink} alt='Place' />

      <h2 className='card-popup__name'>{popupImageTitle}</h2>
    </Popup>
  );
};

export default ImagePopup;
