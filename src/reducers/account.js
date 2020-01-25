const reducer = (state, action) => {
  if (state === undefined) {
    return {
      isAuth: false,
      token: '',
      refreshToken: ''
    };
  }
  console.log(action.type);
  switch (action.type) {
    case 'FETCH_ACCOUNT_AUTH_SUCCESS':
      return {
        ...state,
        isAuth: true,
        token: action.token,
        refreshToken: action.refreshToken
      };
    case 'FETCH_ACCOUNT_AUTH_LOGOUT':
      return {
        ...state,
        isAuth: false,
        token: '',
        refreshToken: ''
      };
    case 'FETCH_ACCOUNT_REG_SUCCESS':
      return {
        ...state,
        isAuth: true,
        token: action.token,
        refreshToken: action.refreshToken
      };
    default:
      return state;
  }
};
export default reducer;
