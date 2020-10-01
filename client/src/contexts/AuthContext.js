import React from 'react';
import axios from 'axios';
import useAsyncReducer from '../hooks/useAsyncReducer';

export const AuthContext = React.createContext();

const api = process.env.REACT_APP_API_URL;

const validateUser = async () => {
  try {
    const res = await axios.get(api, { withCredentials: true });
    const { data } = res;
    return data;
  } catch (error) {
    return { authenticated: false };
  }
};

const initialState = {
  authenticated: false,
  user: null,
};

const reducer = (state, action) => {
  return new Promise((resolve) => {
    switch (action.type) {
      case 'LOGIN':
        validateUser().then((result) => {
          if (result.authenticated) {
            resolve({
              authenticated: true,
              name: result.user.name,
            });
          } else {
            resolve({
              ...initialState,
            });
          }
        });
        break;
      case 'VALIDATE':
        validateUser().then((result) => {
          if (result.authenticated) {
            resolve({
              ...state,
            });
          } else {
            resolve({
              ...initialState,
            });
          }
        });
        break;
      case 'LOGOUT':
        resolve({
          ...initialState,
        });
        break;
      default:
        resolve(state);
        break;
    }
  });
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useAsyncReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};
