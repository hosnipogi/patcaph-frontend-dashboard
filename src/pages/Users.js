import React from 'react';
import ApprovedUsers from '../components/users/approvedUsers';
import PendingUsers from '../components/users/pendingUsers';
import UnverifiedUsers from '../components/users/unverifiedUsers';
import { UsersProvider } from '../contexts/UsersContext';

const Users = () => {
  return (
    <>
      <h2>Users</h2>
      <UsersProvider>
        <PendingUsers />
        <UnverifiedUsers />
        <ApprovedUsers />
      </UsersProvider>
    </>
  );
};

export default Users;
