import { useEffect } from 'react';

const Popup = ({ name, containerName, isOpen, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;

    const closeByEscape = (event) => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, onClose]);

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? 'popup_visible' : ''}`}
    >
      <div className='popup__page-overlay' onClick={onClose}></div>

      <div className={containerName}>
        {children}

        <button
          className='button popup__close-button'
          type='button'
          title='Close'
          aria-label='close'
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default Popup;
