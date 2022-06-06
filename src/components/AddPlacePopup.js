import { memo, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = (props) => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setTitle('');
    setLink('');
  }, [props.onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAddPlaceSubmit({
      name: title,
      link: link,
    });
  };
  return (
    <PopupWithForm
      name='createCard'
      title='New place'
      isOpen={props.isOpen}
      onClose={props.onClose}
      submitButtonTitle={props.submitButtonTitle}
      onSubmit={handleSubmit}
    >
      <label className='form__field'>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type='text'
          className='form__input form__input_el_card-title'
          id='title-input'
          name='name'
          placeholder='Title'
          required
          minLength='1'
          maxLength='30'
        />
        <span className='form__input-error title-input-error'></span>
      </label>

      <label className='form__field'>
        <input
          value={link}
          onChange={(event) => setLink(event.target.value)}
          type='url'
          className='form__input form__input_el_image-link'
          id='image-input'
          name='link'
          placeholder='Image link'
          required
        />
        <span className='form__input-error image-input-error'></span>
      </label>
    </PopupWithForm>
  );
};

export default memo(AddPlacePopup);
