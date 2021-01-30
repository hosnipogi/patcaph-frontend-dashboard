import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../../lib/hooks/useAxios';
import { ADMIN_GET_PENDING_USERS } from '../../lib/config/URLs';
import {
  Badge,
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

const PendingUsers = () => {
  const { state, dispatch, handleAccept, handleDelete } = useContext(
    UsersContext
  );
  const pendingUsers = state.pendingUsers;
  const approvedUsers = state.approvedUsers;
  const pendingMembers = useAxios(ADMIN_GET_PENDING_USERS);

  useEffect(
    () =>
      pendingMembers &&
      dispatch({
        type: 'SET_PENDING_USERS',
        payload: pendingMembers.data.data,
      }),
    [pendingMembers, dispatch]
  );

  return (
    <>
      {pendingUsers !== null ? (
        <div className="mb-10">
          <h4>New users for approval:</h4>
          <TableContainer className="my-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Wiresign</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Contact Number</TableCell>
                  <TableCell>Batch</TableCell>
                  <TableCell>Membership Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="text-sm">
                {pendingUsers.map((user) => {
                  const { email, id, user_profile } = user;
                  return (
                    user_profile !== null &&
                    user_profile.membership_status === 'Pending' && (
                      <TableRow key={id}>
                        <TableCell>
                          <Link
                            to={`/user?uid=${id}`}
                            className="text-blue-500 hover:underline"
                          >{`${user_profile.firstname} ${user_profile.middlename} ${user_profile.surname}`}</Link>
                        </TableCell>
                        <TableCell>{user_profile.wiresign}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{`${user_profile.address.substring(
                          0,
                          20
                        )}...`}</TableCell>
                        <TableCell>{user_profile.contactNumber}</TableCell>
                        <TableCell>{user_profile.batch}</TableCell>
                        <TableCell>
                          <Badge type={'warning'}>
                            {user_profile.membership_status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            className="mr-2"
                            onClick={() =>
                              handleAccept(id, () => {
                                const approved = pendingUsers.find(
                                  (pu) => pu.email === email
                                );
                                approved.user_profile.membership_status =
                                  'Approved';
                                dispatch({
                                  type: 'SET_APPROVED_USERS',
                                  payload: [...approvedUsers, approved],
                                });
                                dispatch({
                                  type: 'SET_PENDING_USERS',
                                  payload: pendingUsers.filter(
                                    (pu) => pu.email !== email
                                  ),
                                });
                              })
                            }
                          >
                            Accept
                          </Button>
                          <Button
                            onClick={() =>
                              handleDelete(id, () =>
                                dispatch({
                                  type: 'SET_PENDING_USERS',
                                  payload: pendingUsers.filter(
                                    (pu) => pu.email !== email
                                  ),
                                })
                              )
                            }
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  );
                })}
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

export default PendingUsers;
