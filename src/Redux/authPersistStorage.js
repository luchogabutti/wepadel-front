const AUTH_REMEMBER_KEY = 'wepadel_remember';

export const setRememberSession = (remember) => {
  sessionStorage.setItem(AUTH_REMEMBER_KEY, remember ? 'true' : 'false');
};

const isRememberSession = () => sessionStorage.getItem(AUTH_REMEMBER_KEY) === 'true';

export const authPersistStorage = {
  getItem: (key) => {
    const fromLocal = localStorage.getItem(key);
    if (fromLocal) {
      sessionStorage.setItem(AUTH_REMEMBER_KEY, 'true');
      return Promise.resolve(fromLocal);
    }

    const fromSession = sessionStorage.getItem(key);
    if (fromSession) {
      sessionStorage.setItem(AUTH_REMEMBER_KEY, 'false');
      return Promise.resolve(fromSession);
    }

    return Promise.resolve(null);
  },
  setItem: (key, value) => {
    if (isRememberSession()) {
      sessionStorage.removeItem(key);
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
      sessionStorage.setItem(key, value);
    }
    return Promise.resolve();
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
    sessionStorage.removeItem(AUTH_REMEMBER_KEY);
    return Promise.resolve();
  },
};
