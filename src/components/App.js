import { useState, useEffect, useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import api from '../utils/api';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import LoadingSpinner from './LoadingSpinner';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import * as auth from '../utils/auth';
import { AuthContext } from '../contexts/AuthContext';
import { HeaderLinkContext } from '../contexts/HeaderLinkContext';
import InfoTooltip from './InfoTooltip';
import ImagePopup from './ImagePopup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [linkText, changeLinkTextContext] = useState('');
  const [linkPath, changeLinkPathContext] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [addPlaceSubmitButtonTitle, setAddPlaceSubmitButtonTitle] =
    useState('Create');
  const [editAvatarSubmitButtonTitle, setEditAvatarSubmitButtonTitle] =
    useState('Save');
  const [editProfileSubmitButtonTitle, setEditProfileSubmitButtonTitle] =
    useState('Save');
  const [confirmDeleteButtonTitle, setConfirmDeleteButtonTitle] =
    useState('Yes');
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    resetForm();

    if (!isLoggedIn) {
      history.push('./signin');
    }
  }, [isLoggedIn, history]);

  useEffect(() => {
    const close = (e) => {
      if (e.code === 'Escape') {
        closeAllPopups();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      auth
        .checkTokenValidity(token)
        .then((res) => {
          setIsLoggedIn(true);
          setIsLoading(true);
          setUserEmail(res.data.email);
          history.push('/users/me');
        })
        .then(() => {
          api
            .getInitialData()
            .then(([card, user]) => {
              setCurrentUser(user);
              setCards(card);
              setIsLoading(false);
            })
            .catch((err) =>
              console.log(`Error while initializing data: ${err}`)
            );
        });
    }
  }, [history, userEmail]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (data) => {
    setSelectedCard({
      isCardOpen: true,
      id: data.id,
      link: data.link,
      title: data.name,
    });
  };

  const handleCardLike = useCallback((card, isLiked) => {
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => console.log(`Error while initializing data: ${err}`));
  }, []);

  const handleCardDelete = (id) => {
    setIsConfirmPopupOpen(true);
    setSelectedCard({
      id: id,
    });
  };

  const handleUpdateUser = ({ name, about }) => {
    setEditProfileSubmitButtonTitle('Saving...');
    api
      .uploadUserInfo({ name, about })
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error while initializing data: ${err}`))
      .finally(() => setEditProfileSubmitButtonTitle('Save'));
  };

  const handleUpdateAvatar = (url) => {
    setEditAvatarSubmitButtonTitle('Saving...');
    api
      .uploadProfileAvatar(url)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error while initializing data: ${err}`))
      .finally(() => setEditAvatarSubmitButtonTitle('Save'));
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    setAddPlaceSubmitButtonTitle('Saving...');
    api
      .uploadCard({ name, link })
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error while initializing data: ${err}`))
      .finally(() => setAddPlaceSubmitButtonTitle('Create'));
  };

  const handleDeleteSubmit = (cardId) => {
    setConfirmDeleteButtonTitle('Deleting...');
    api
      .deleteCard(cardId)
      .then(() => {
        setCards(cards.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => console.log(`Error while initializing data: ${err}`))
      .finally(() => setConfirmDeleteButtonTitle('Yes'));
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({
      isCardOpen: false,
    });
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    auth
      .register(email, password)
      .then(() => {
        setIsRegistered(true);
        history.push('/signin');
      })
      .catch((err) => {
        setIsRegistered(false);

        if (err === 400) {
          console.log('One of the fields was filled in incorrectly');
        } else {
          console.log(`Something went wrong: ${err}`);
        }
      })
      .finally(() => setIsInfoTooltipOpen(true));
  };

  const handleLogin = (event) => {
    event.preventDefault();
    auth
      .authorize(email, password)
      .then(() => {
        setIsLoading(true);
        setIsLoggedIn(true);
        setUserEmail(email);
      })
      .then(() => {
        history.push('/users/me');
      })
      .catch((err) => {
        if (err === 400) {
          console.log('One or more of the fields were not provided');
        } else if (err === 401) {
          console.log('Incorrect email address or password');
        } else {
          console.log(`Something went wrong: ${err}`);
        }
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUserEmail('');
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AuthContext.Provider
        value={{ isLoggedIn, isRegistered, setIsLoggedIn, setIsRegistered }}
      >
        <HeaderLinkContext.Provider
          value={{
            linkText,
            linkPath,
            changeLinkTextContext,
            changeLinkPathContext,
          }}
        >
          <div className='page'>
            {isLoading && <LoadingSpinner />}

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              submitButtonTitle={editAvatarSubmitButtonTitle}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              submitButtonTitle={editProfileSubmitButtonTitle}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              submitButtonTitle={addPlaceSubmitButtonTitle}
              onClose={closeAllPopups}
              onAddPlaceSubmit={handleAddPlaceSubmit}
            />

            <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} />

            <ConfirmPopup
              isOpen={isConfirmPopupOpen}
              selectedCard={selectedCard}
              submitButtonTitle={confirmDeleteButtonTitle}
              onClose={closeAllPopups}
              onDeleteSubmit={handleDeleteSubmit}
            />

            <InfoTooltip
              name='infoTooltip'
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
            />

            {!isLoading && (
              <Header
                userEmail={userEmail}
                link={linkPath}
                linkText={linkText}
                onSignOut={handleSignOut}
              />
            )}

            <Switch>
              {!isLoading && (
                <ProtectedRoute
                  path='/users/me'
                  component={Main}
                  onEditAvatarClick={handleEditAvatarClick}
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  selectedCard={selectedCard}
                  isAddPlaceClick={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  cards={cards}
                />
              )}

              <Route path='/signup'>
                <Register
                  email={email}
                  password={password}
                  onEmailChange={handleEmail}
                  onPasswordChange={handlePassword}
                  onRegister={handleRegister}
                  onFormReset={resetForm}
                />
              </Route>

              <Route path='/signin'>
                <Login
                  email={email}
                  password={password}
                  onEmailChange={handleEmail}
                  onPasswordChange={handlePassword}
                  onLogin={handleLogin}
                  onFormReset={resetForm}
                />
              </Route>
            </Switch>
          </div>
        </HeaderLinkContext.Provider>
      </AuthContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
