class Api {
  constructor(url) {
    this._url = url;
  }

  getInitialData = (token) =>
    Promise.all([this.getInitialCards(token), this.getUserInfo(token)]);

  getUserInfo(token) {
    return this._defaultFetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  uploadUserInfo(data, token) {
    return this._defaultFetch(`${this._url}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  uploadProfileAvatar(url, token) {
    return this._defaultFetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({ avatar: url }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getInitialCards(token) {
    return this._defaultFetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  uploadCard(data, token) {
    return this._defaultFetch(`${this._url}/cards`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteCard(cardId, token) {
    return this._defaultFetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  likeCard(cardId, token) {
    return this._defaultFetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  dislikeCard(cardId, token) {
    return this._defaultFetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    return this._defaultFetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  _defaultFetch = (url, settings) =>
    fetch(url, settings).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
}

const api = new Api('https://api.dimagorodov.students.nomoreparties.sbs');

export default api;
