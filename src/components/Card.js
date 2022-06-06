import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = ({ card, ...props }) => {
  const currentUserContext = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUserContext._id;
  const isLiked = card.likes.some(
    (user) => user._id === currentUserContext._id
  );

  const handleLike = () => {
    props.onLike(card, isLiked);
  };

  const handleDelete = () => {
    props.onDelete(card._id);
  };

  return (
    <li key={props} className='cards__item'>
      <img
        className='cards__photo'
        src={`${card.link}`}
        alt={card.name}
        onClick={() =>
          props.onClick({ id: card._id, link: card.link, name: card.name })
        }
      />

      {isOwn && (
        <button
          className='button cards__delete-button'
          type='button'
          title='Delete'
          aria-label='delete'
          onClick={handleDelete}
        ></button>
      )}

      <div className='cards__content'>
        <p className='cards__name'>{card.name}</p>

        <div className='cards__like'>
          <button
            className={`button cards__like-button ${
              isLiked ? 'cards__like-button_active' : ''
            }`}
            type='button'
            title='Like'
            aria-label='like'
            onClick={handleLike}
          ></button>
          <span className='cards__likes-amount'>{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
};

export default Card;
