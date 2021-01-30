import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../../lib/hooks/useAxios';
import { ADMIN_GET_APPROVED_USERS } from '../../lib/config/URLs';
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

const ApprovedUsers = () => {
  const { state, dispatch, handleDelete } = useContext(UsersContext);
  const approvedUsers = state.approvedUsers;
  const approvedMembers = useAxios(ADMIN_GET_APPROVED_USERS);

  useEffect(
    () =>
      approvedMembers &&
      dispatch({
        type: 'SET_APPROVED_USERS',
        payload: approvedMembers.data.data,
      }),
    [approvedMembers, dispatch]
  );

  return (
    <>
      {approvedUsers !== null ? (
        <div className="my-10">
          <h3 className="text-gray-700">Verified Members</h3>
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>User ID</TableCell>
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
                {approvedUsers.map((user) => {
                  const { email, id, user_profile } = user;
                  return (
                    <TableRow key={id}>
                      <TableCell>{id}</TableCell>
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
                        <Badge
                          type={
                            user_profile.membership_status === 'Pending'
                              ? 'warning'
                              : 'success'
                          }
                        >
                          {user_profile.membership_status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          className="mr-2"
                          onClick={() =>
                            handleDelete(id, () => {
                              dispatch({
                                type: 'SET_APPROVED_USERS',
                                payload: approvedUsers.filter(
                                  (au) => au.email !== email
                                ),
                              });
                            })
                          }
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
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

export default ApprovedUsers;
