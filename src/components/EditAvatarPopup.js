import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = (props) => {
  const imageInput = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onUpdateAvatar(imageInput.current.value);
    imageInput.current.value = '';
  };

  return (
    <PopupWithForm
      name='editProfileAvatar'
      title='Change profile picture'
      isOpen={props.isOpen}
      onClose={props.onClose}
      submitButtonTitle={props.submitButtonTitle}
      onSubmit={handleSubmit}
    >
      <label className='form__field'>
        <input
          ref={imageInput}
          type='url'
          className='form__input form__input_el_avatar-link'
          id='avatar-input'
          name='link'
          placeholder='Image link'
          required
        />
        <span className='form__input-error avatar-input-error'></span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
