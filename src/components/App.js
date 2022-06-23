import { useState, useEffect } from 'react';
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

  const [token, setToken] = useState(localStorage.getItem('jwt'));

  const history = useHistory();

  useEffect(() => {
    resetForm();

    if (!isLoggedIn) {
      history.push('/signin');
    }
  }, [isLoggedIn, history]);

  useEffect(() => {
    if (token) {
      auth
        .checkTokenValidity(token)
        .then((res) => {
          setIsLoggedIn(true);
          setIsLoading(true);
          setUserEmail(res.data.email);
          history.push('/users/me');
        })
        .catch((err) => console.log(err));
    } else {
      setIsLoggedIn(false);
    }
  }, [history, token]);

  useEffect(() => {
    if (token) {
      api
        .getInitialData(token)
        .then(([card, user]) => {
          setCurrentUser(user.data);
          setCards(card.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(`Error while initializing data: ${err}`));
    }
  }, [token]);

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

  const handleCardLike = (card, isLiked) => {
    api
      .changeLikeCardStatus(card._id, !isLiked, token)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard.data : currentCard
          )
        );
      })
      .catch((err) => console.log(`Error while initializing data: ${err}`));
  };

  const handleCardDelete = (id) => {
    setIsConfirmPopupOpen(true);
    setSelectedCard({
      id: id,
    });
  };

  const handleUpdateUser = ({ name, about }) => {
    setEditProfileSubmitButtonTitle('Saving...');
    api
      .uploadUserInfo({ name, about }, token)
      .then((user) => {
        setCurrentUser(user.data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error while initializing data: ${err}`))
      .finally(() => setEditProfileSubmitButtonTitle('Save'));
  };

  const handleUpdateAvatar = (url) => {
    setEditAvatarSubmitButtonTitle('Saving...');
    api
      .uploadProfileAvatar(url, token)
      .then((user) => {
        setCurrentUser(user.data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error while initializing data: ${err}`))
      .finally(() => setEditAvatarSubmitButtonTitle('Save'));
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    setAddPlaceSubmitButtonTitle('Saving...');
    api
      .uploadCard({ name, link }, token)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error while initializing data: ${err}`))
      .finally(() => setAddPlaceSubmitButtonTitle('Create'));
  };

  const handleDeleteSubmit = (cardId) => {
    setConfirmDeleteButtonTitle('Deleting...');
    api
      .deleteCard(cardId, token)
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
    setIsLoading(true);

    auth
      .register({ email, password })
      .then(() => {
        setIsRegistered(true);
        history.push('/signin');
      })
      .catch((err) => {
        setIsRegistered(false);

        if (err === 400) {
          console.log('One of the fields was filled in incorrectly');
        } else if (err === 409) {
          console.log('The User is already exists');
        } else {
          console.log(`Something went wrong: ${err}`);
        }
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
        setIsLoading(false);
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoading(true);

    auth
      .authorize({ email, password })
      .then((res) => {
        setToken(res.token);
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
      })
      .finally(() => setIsLoading(false));
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
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

            <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} />

            <Header
              userEmail={userEmail}
              link={linkPath}
              linkText={linkText}
              onSignOut={handleSignOut}
            />

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
