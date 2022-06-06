class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialData = () =>
    Promise.all([this.getInitialCards(), this.getUserInfo()]);

  getUserInfo() {
    return this._defaultFetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  uploadUserInfo(data) {
    return this._defaultFetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: this._headers,
    });
  }

  uploadProfileAvatar(url) {
    return this._defaultFetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({ avatar: url }),
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._defaultFetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  uploadCard(data) {
    return this._defaultFetch(`${this._baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: this._headers,
    });
  }

  deleteCard(cardId) {
    return this._defaultFetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  likeCard(cardId) {
    return this._defaultFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  dislikeCard(cardId) {
    return this._defaultFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return this._defaultFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    });
  }

  _defaultFetch = (baseUrl, settings) =>
    fetch(baseUrl, settings).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "21827e70-d261-4f64-a3bc-4b52f52216ed",
    "Content-Type": "application/json",
  },
});

export default api;
