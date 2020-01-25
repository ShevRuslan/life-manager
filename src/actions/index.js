export const accountAuth = (token, refreshToken) => {
  return {
    type: 'FETCH_ACCOUNT_AUTH_SUCCESS',
    token: token,
    refreshToken: refreshToken
  };
};

export const accountLogout = () => {
  return {
    type: 'FETCH_ACCOUNT_LOGOUT'
  };
};

export const accountReg = (token, refreshToken) => {
  return {
    type: 'FETCH_ACCOUNT_REG_SUCCESS',
    token: token,
    refreshToken: refreshToken
  };
};
