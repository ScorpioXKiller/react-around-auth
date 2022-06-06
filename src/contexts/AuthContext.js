import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  isRegistered: false,

  setIsLoggedIn: (_auth) => {
    /* TODO document why this method 'setLoggedIn' is empty */
  },

  setIsRegistered: (_auth) => {
    /* TODO document why this method 'setIsRegistered' is empty */
  },
});
