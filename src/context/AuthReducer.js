const AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        localStorage.setItem("user", JSON.stringify(action.payload));
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
        };
      case "LOGOUT":
        localStorage.clear();
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      case "LOGIN_ERROR":
        return {
          ...state,
          loginError: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default AuthReducer;
  