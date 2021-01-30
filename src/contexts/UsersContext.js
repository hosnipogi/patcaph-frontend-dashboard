import React, { createContext, useReducer } from 'react';
import { ADMIN_DELETE_USER, ADMIN_UPDATE_USER } from '../lib/config/URLs';
import Api from '../lib/services/api';

const initialState = {
  approvedUsers: null,
  pendingUsers: null,
  unverifiedUsers: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_APPROVED_USERS':
      return { ...state, approvedUsers: action.payload };
    case 'SET_PENDING_USERS':
      return { ...state, pendingUsers: action.payload };
    case 'SET_UNVERIFIED_USERS':
      return { ...state, unverifiedUsers: action.payload };
    default:
      return state;
  }
};

export const UsersContext = createContext(null);
export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDelete = async (id, cb) => {
    const api = new Api({
      url: `${ADMIN_DELETE_USER}/${id}`,
      method: 'delete',
    });

    try {
      const { status } = await api.fetch();
      if (status === 200) {
        alert('Success');
        cb();
      } else {
        throw Error('Error submitting request');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async (id, cb) => {
    const api = new Api({
      url: `${ADMIN_UPDATE_USER}/${id}`,
      method: 'patch',
    });

    try {
      const { status } = await api.fetch();
      if (status === 200) {
        alert('Success');
        cb();
      } else {
        throw Error('Error submitting request');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UsersContext.Provider
      value={{ state, dispatch, handleAccept, handleDelete }}
    >
      {children}
    </UsersContext.Provider>
  );
};
