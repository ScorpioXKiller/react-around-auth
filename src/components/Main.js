import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { HeaderLinkContext } from '../contexts/HeaderLinkContext';
import avatarEditButton from '../images/ui/avatar-edit-button.svg';
import Card from './Card';
import Footer from './Footer';
import ImagePopup from './ImagePopup';

const Main = (props) => {
  const userData = useContext(CurrentUserContext);
  const { changeLinkTextContext, changeLinkPathContext } =
    useContext(HeaderLinkContext);

  useEffect(() => {
    changeLinkTextContext('Sign out');
    changeLinkPathContext('/signin');
  }, [changeLinkTextContext, changeLinkPathContext]);

  return (
    <>
      <main className='content'>
        <section className='profile'>
          <div
            className='profile__avatar'
            style={{ backgroundImage: `url(${userData.avatar})` }}
          >
            <div className='profile__avatar-overlay'>
              <img
                id='avatar-edit'
                className='profile__avatar-edit-button'
                src={avatarEditButton}
                alt='Edit button'
                onClick={props.onEditAvatarClick}
              />
            </div>
          </div>

          <div className='profile__info-container'>
            <div className='profile__info'>
              <h1 className='profile__name'>{userData.name}</h1>

              <button
                className='button profile__edit-button'
                type='button'
                id='info-edit'
                title='Edit profile'
                aria-label='edit'
                onClick={props.onEditProfileClick}
              ></button>

              <p className='profile__about'>{userData.about}</p>
            </div>

            <button
              className='button profile__add-button'
              type='button'
              id='add'
              title='Add image'
              aria-label='add'
              onClick={props.onAddPlaceClick}
            ></button>
          </div>
        </section>

        <section className='user-photos'>
          <ul className='cards'>
            {props.cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onClick={props.onCardClick}
                onLike={props.onCardLike}
                onDelete={props.onCardDelete}
              />
            ))}
          </ul>
        </section>

        <ImagePopup selectedCard={props.selectedCard} onClose={props.onClose} />
      </main>

      <Footer />
    </>
  );
};

export default Main;
