import { createContext } from 'react';

export const HeaderLinkContext = createContext({
  linkText: 'Sign up',
  linkPath: '/signup',
  changeLinkTextContext: (_text) => {
    /* TODO document why this method 'changeLinkContext' is empty */
  },

  changeLinkPathContext: (_path) => {
    /* TODO document why this method 'changeLinkPathContext' is empty */
  },
});
