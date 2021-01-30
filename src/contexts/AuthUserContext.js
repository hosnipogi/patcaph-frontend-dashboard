import React, { createContext, useEffect, useReducer, useState } from 'react';
import {
  AUTH_USER_DASHBOARD,
  AUTH_USER_DASHBOARD_PHOTO,
} from '../lib/config/URLs';
import useAxios from '../lib/hooks/useAxios';

const initialState = {
  user: {
    email: null,
    name: null,
    role: null,
    avatar: null,
  },
  profile: {
    firstname: null,
    middlename: null,
    surname: null,
    address: '',
    contactNumber: '',
    gender: null,
    civilStatus: '',
    birthday: null,
    birthplace: null,
    batch: null,
    wiresign: null,
    facility: null,
    dateEmployed: null,
    licenseNumber: null,
    ATCLicenseExpiry: '',
    medicalLicenseExpiry: '',
    membership_status: null,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_USER_PROFILE':
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};

export const AuthUserContext = createContext(null);
export const AuthUserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [img, setImg] = useState(null);
  const [user, setUser] = useState(null);

  const avatar = useAxios(AUTH_USER_DASHBOARD_PHOTO);
  const auth = useAxios(AUTH_USER_DASHBOARD);

  useEffect(() => {
    avatar !== null && setImg(avatar.request.responseURL);
  }, [avatar]);

  useEffect(() => {
    auth !== null && setUser(auth.data);
  }, [auth]);

  useEffect(() => {
    img !== null &&
      user !== null &&
      dispatch({
        type: 'SET_USER',
        payload: {
          email: user.email,
          name: user.name,
          avatar: img,
          role: user.role,
        },
      });
  }, [img, user]);

  return (
    <AuthUserContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthUserContext.Provider>
  );
};
