export const BASE_URL = 'https://register.nomoreparties.co';

export const register = (email, password) => {
  return fetchPost('signup', { email, password }).then((res) => {
    return res;
  });
};

export const authorize = (email, password) => {
  return fetchPost('signin', { email, password }).then((data) => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      return data;
    }
  });
};

export const checkTokenValidity = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .then((data) => data);
};

const fetchPost = (route, props) => {
  return fetch(`${BASE_URL}/${route}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props),
  }).then(checkResponse);
};

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response.status);
};
