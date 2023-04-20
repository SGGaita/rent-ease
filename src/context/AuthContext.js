import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const initialState = {
  isAuthenticated: localStorage.getItem("user") ? true : false,
  user: JSON.parse(localStorage.getItem("user")),
  loginError:null,
};

export const AuthContext = createContext({
  state: initialState,
  dispatch: () => {},
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};



