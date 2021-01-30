import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAxios from '../lib/hooks/useAxios';
import Api from '../lib/services/api';
import {
  ADMIN_GET_SINGLE_USER,
  ADMIN_GET_SINGLE_USER_PHOTO,
  ADMIN_UPDATE_USER,
  ADMIN_DELETE_USER,
} from '../lib/config/URLs';
import useQuery from '../lib/hooks/useQuery';
import { CustomCard, Loading } from '../components/UI/';
import ProgressiveImage from '../components/ProgressiveImage';
import {
  Button,
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@windmill/react-ui';

const User = () => {
  const query = useQuery();
  const uid = query.get('uid');

  const user = useAxios(`${ADMIN_GET_SINGLE_USER}/${uid}`);
  const photo = useAxios(`${ADMIN_GET_SINGLE_USER_PHOTO}/${uid}`);

  const [userData, setUserData] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);

  const history = useHistory();

  useEffect(() => {
    user !== null && setUserData(user.data);
  }, [user]);

  useEffect(() => {
    photo !== null && setUserPhoto(photo.request.responseURL);
  }, [photo]);

  const handleDelete = async (id) => {
    const api = new Api({
      url: `${ADMIN_DELETE_USER}/${id}`,
      method: 'delete',
    });
    try {
      const { data } = await api.fetch();
      data && alert('Success');
      history.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async (id) => {
    const api = new Api({
      url: `${ADMIN_UPDATE_USER}/${id}`,
      method: 'patch',
    });

    try {
      const { status } = await api.fetch();
      if (status === 200) {
        alert('Success');
        history.goBack();
      } else {
        throw Error('Error submitting request');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {userData !== null && userPhoto !== null ? (
        <>
          <Button onClick={() => history.goBack()} className="mr-2">
            Back
          </Button>
          {userData.user_profile.membership_status === 'Pending' && (
            <Button onClick={() => handleAccept(userData.id)} className="mr-2">
              Accept
            </Button>
          )}
          <Button onClick={() => handleDelete(userData.id)}>Delete</Button>

          <CustomCard>
            <h3>Personal Information</h3>
            <div className="grid-cols-4 gap-4 lg:grid">
              <CustomCard styles="rounded-lg">
                <ProgressiveImage
                  preview={userPhoto}
                  image={userPhoto}
                  alt={`${userData.user_profile.wiresign} ${userData.user_profile.surname} Avatar`}
                />
              </CustomCard>
              <div className="col-span-3">
                <CustomCard>
                  <h4>Name</h4>
                  <p>{`${userData.user_profile.firstname} ${userData.user_profile.middlename} ${userData.user_profile.surname} (${userData.user_profile.wiresign})`}</p>
                </CustomCard>
                <CustomCard>
                  <h4>Email</h4>
                  <p>{userData.email}</p>
                </CustomCard>
                <div className="grid-cols-2 gap-4 lg:grid">
                  <CustomCard>
                    <h4>Account created</h4>
                    <p>{new Date(userData.created_at).toLocaleDateString()}</p>
                  </CustomCard>
                  <CustomCard>
                    <h4>Last updated</h4>
                    <p>{new Date(userData.updated_at).toLocaleDateString()}</p>
                  </CustomCard>
                </div>
              </div>
            </div>
            <CustomCard>
              <h4>Address</h4>
              <p>{userData.user_profile.address}</p>
            </CustomCard>
            <CustomCard>
              <h4>Contact Number</h4>
              <p>{userData.user_profile.contactNumber}</p>
            </CustomCard>
            <div className="grid-cols-2 gap-4 lg:grid">
              <CustomCard>
                <h4>Gender</h4>
                <p>{userData.user_profile.gender}</p>
              </CustomCard>
              <CustomCard>
                <h4>Civil Status</h4>
                <p>{userData.user_profile.civilStatus}</p>
              </CustomCard>
            </div>
            <div className="grid-cols-2 gap-4 lg:grid">
              <CustomCard>
                <h4>Birthday</h4>
                <p>{userData.user_profile.birthday}</p>
              </CustomCard>
              <CustomCard>
                <h4>Birthplace</h4>
                <p>{userData.user_profile.birthplace}</p>
              </CustomCard>
            </div>
          </CustomCard>
          <CustomCard>
            <h3>Employment Information</h3>
            <div className="grid-cols-3 gap-4 lg:grid">
              <CustomCard>
                <h4>batch</h4>
                <p>{userData.user_profile.batch}</p>
              </CustomCard>
              <CustomCard>
                <h4>Date Employed</h4>
                <p>{userData.user_profile.dateEmployed}</p>
              </CustomCard>
              <CustomCard>
                <h4>License Number</h4>
                <p>{userData.user_profile.licenseNumber}</p>
              </CustomCard>
            </div>
            <div className="grid-cols-2 gap-4 lg:grid">
              <CustomCard>
                <h4>ATC License Expiry</h4>
                <p>{userData.user_profile.ATCLicenseExpiry}</p>
              </CustomCard>
              <CustomCard>
                <h4>Medical License Expiry</h4>
                <p>{userData.user_profile.medicalLicenseExpiry}</p>
              </CustomCard>
            </div>
          </CustomCard>
          <CustomCard>
            <TableContainer className="my-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>Facility</TableCell>
                    <TableCell>Area</TableCell>
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                    <TableCell>Designation</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-sm">
                  {userData.user_profile.facility.map((fac, i) => (
                    <TableRow key={i}>
                      <TableCell>{fac.facility}</TableCell>
                      <TableCell>{fac.area}</TableCell>
                      <TableCell>{fac.from}</TableCell>
                      <TableCell>{fac.to}</TableCell>
                      <TableCell>{fac.designation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CustomCard>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default User;
