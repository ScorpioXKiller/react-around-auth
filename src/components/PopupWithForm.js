import Popup from './Popup';

const PopupWithForm = ({ name, isOpen, onClose, children, ...props }) => {
  return (
    <Popup name={name} containerName='popup__container' isOpen={isOpen} onClose={onClose}>
      <h2 className='popup__title'>{props.title}</h2>

      <form className='form' name={props.name} onSubmit={props.onSubmit}>
        {children}

        <button
          className='button form__submit-button'
          type='submit'
          title='Save'
        >
          {props.submitButtonTitle}
        </button>
      </form>
    </Popup>
  );
};

export default PopupWithForm;
