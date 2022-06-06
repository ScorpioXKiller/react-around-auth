import { useEffect, useState } from 'react';

const ImagePopup = ({ selectedCard, ...props }) => {
  const [popupImageLink, setPopupImageLink] = useState('');
  const [popupImageTitle, setPopupImageName] = useState('');

  useEffect(() => {
    if (selectedCard.isCardOpen) {
      setPopupImageLink(selectedCard.link);
      setPopupImageName(selectedCard.title);
    }
  }, [selectedCard]);

  return (
    <section
      className={`popup popup_type_imagePopup ${
        selectedCard.isCardOpen ? 'popup_visible' : ''
      }`}
    >
      <div className='popup__page-overlay' onClick={props.onClose}></div>

      <div className='card-popup__container'>
        <button
          className='button popup__close-button card-popup__close-button'
          type='button'
          title='Close'
          aria-label='close'
          onClick={props.onClose}
        ></button>

        <img className='card-popup__image' src={popupImageLink} alt='Place' />

        <h2 className='card-popup__name'>{popupImageTitle}</h2>
      </div>
    </section>
  );
};

export default ImagePopup;
