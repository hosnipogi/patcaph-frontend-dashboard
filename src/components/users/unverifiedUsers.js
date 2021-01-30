import React, { useEffect, useContext } from 'react';
import useAxios from '../../lib/hooks/useAxios';
import { ADMIN_GET_UNVERIFIED_USERS } from '../../lib/config/URLs';
import {
  Button,
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@windmill/react-ui';
import { Loading } from '../UI/';
import { UsersContext } from '../../contexts/UsersContext';

const UnverifiedUsers = () => {
  const { state, dispatch, handleDelete } = useContext(UsersContext);
  const unverifiedUsers = state.unverifiedUsers;
  const unverifiedMembers = useAxios(ADMIN_GET_UNVERIFIED_USERS);

  useEffect(
    () =>
      unverifiedMembers &&
      dispatch({
        type: 'SET_UNVERIFIED_USERS',
        payload: unverifiedMembers.data.data,
      }),
    [unverifiedMembers, dispatch]
  );

  return (
    <>
      {unverifiedUsers !== null ? (
        <div className="my-10">
          <h4 className="my-3">Incomplete registration:</h4>
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Date Registered</TableCell>
                  <TableCell>Has Verified Email</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="text-sm">
                {unverifiedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.created_at}</TableCell>
                    <TableCell>
                      {user.email_verified_at ? 'True' : 'False'}
                    </TableCell>
                    <TableCell>
                      <Button
                        className="mr-2"
                        onClick={() =>
                          handleDelete(user.id, () => {
                            dispatch({
                              type: 'SET_UNVERIFIED_USERS',
                              payload: unverifiedUsers.filter(
                                (au) => au.email !== user.email
                              ),
                            });
                          })
                        }
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <Loading inline={true} />
      )}
    </>
  );
};

export default UnverifiedUsers;
