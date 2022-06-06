const ConfirmPopup = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onDeleteSubmit(props.selectedCard.id);
  };

  return (
    <section
      className={`popup confirm-popup ${props.isOpen && 'popup_visible'}`}
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
        <h2 className='popup__title confirm-popup-title'>Are you sure?</h2>
        <form className='form' noValidate onSubmit={handleSubmit}>
          <button
            className='button form__submit-button'
            type='submit'
            title='Confirm'
          >
            {props.submitButtonTitle}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ConfirmPopup;
