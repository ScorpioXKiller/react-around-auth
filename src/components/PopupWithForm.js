const PopupWithForm = (props) => {
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? 'popup_visible' : ''
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

        <h2 className='popup__title'>{props.title}</h2>

        <form
          className='form'
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}

          <button
            className='button form__submit-button'
            type='submit'
            title='Save'
          >
            {props.submitButtonTitle}
          </button>
        </form>
      </div>
    </section>
  );
};

export default PopupWithForm;
