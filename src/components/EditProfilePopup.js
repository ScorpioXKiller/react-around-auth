import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

const EditProfilePopup = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name='editProfile'
      title='Edit profile'
      isOpen={props.isOpen}
      onClose={props.onClose}
      submitButtonTitle={props.submitButtonTitle}
      onSubmit={handleSubmit}
    >
      <label className='form__field'>
        <input
          type='text'
          className='form__input form__input_el_user-name'
          id='name-input'
          name='name'
          placeholder='Name'
          required
          minLength='2'
          maxLength='40'
          value={name || ''}
          onChange={(event) => setName(event.target.value)}
        />
        <span className='form__input-error name-input-error'></span>
      </label>

      <label className='form__field'>
        <input
          type='text'
          className='form__input form__input_el_user-about'
          id='about-input'
          name='about'
          placeholder='About Me'
          required
          minLength='2'
          maxLength='200'
          value={description || ''}
          onChange={(event) => setDescription(event.target.value)}
        />
        <span className='form__input-error about-input-error'></span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
