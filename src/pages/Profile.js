import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthUserContext } from '../contexts/AuthUserContext';
import useAxios from '../lib/hooks/useAxios';
import {
  AUTH_USER_DASHBOARD_PROFILE,
  AUTH_USER_DASHBOARD_PROFILE_UPDATE,
  PROFILE_FIELDS,
} from '../lib/config/URLs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ImageCropper from '../components/ImageCropper';
import { CustomCard, Loading } from '../components/UI/';
import {
  Badge,
  Button,
  HelperText,
  Input,
  Label,
  Select,
  Textarea,
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@windmill/react-ui';
import Api from '../lib/services/api';

const Profile = () => {
  /*** get user data */

  const { state, dispatch } = useContext(AuthUserContext);
  let { profile, user } = state;
  const { avatar } = user;

  const {
    firstname,
    middlename,
    surname,
    address,
    contactNumber,
    gender,
    civilStatus,
    birthday,
    birthplace,
    batch,
    wiresign,
    facility,
    dateEmployed,
    licenseNumber,
    ATCLicenseExpiry,
    medicalLicenseExpiry,
    membership_status,
  } = profile;

  const userData = useAxios(AUTH_USER_DASHBOARD_PROFILE);
  useEffect(() => {
    userData !== null &&
      dispatch({ type: 'SET_USER_PROFILE', payload: userData.data });
  }, [userData, dispatch]);

  /** get fields to display */

  const profileFields = useAxios(PROFILE_FIELDS);
  const [fields, setFields] = useState({
    civil_status: null,
    facilities: null,
    designation: null,
  });

  useEffect(() => {
    profileFields !== null && setFields(profileFields.data);
  }, [profileFields]);

  const { civil_status, facilities, designation } = fields;

  /** formik specific */

  const Formik = useFormik({
    initialValues: {
      address,
      contactNumber,
      civilStatus,
      ATCLicenseExpiry,
      medicalLicenseExpiry,
      facility,
    },
    validationSchema: Yup.object({
      address: Yup.string().required(),
      contactNumber: Yup.string()
        .matches(/^\+?[0-9]+$/, 'Must be a number')
        .trim()
        .min(6)
        .required(),
      civilStatus: Yup.string().required(),
      ATCLicenseExpiry: Yup.date().required(),
      medicalLicenseExpiry: Yup.date().required(),
      facility: Yup.array(
        Yup.object({
          facility: Yup.string().required('⚠️'),
          area: Yup.string().required('⚠️'),
          from: Yup.date().required('⚠️'),
          to: Yup.date().required('⚠️'),
          designation: Yup.string().required('⚠️'),
        })
      ),
    }),
    onSubmit: async (values) => {
      const api = new Api({
        url: AUTH_USER_DASHBOARD_PROFILE_UPDATE,
        method: 'patch',
        data: values,
      });

      try {
        const result = await api.fetch();
        if (result.status === 200) {
          dispatch({
            type: 'SET_USER_PROFILE',
            payload: { ...profile, ...values },
          });
          alert('Successfully updated profile');
        }
      } catch (error) {
        alert(JSON.stringify(error.errors));
        console.log(error.message);
      }
    },
  });

  useEffect(() => {
    const f = Formik.setValues;
    f({
      address,
      contactNumber,
      civilStatus,
      ATCLicenseExpiry,
      medicalLicenseExpiry,
      facility,
    });
  }, [
    address,
    contactNumber,
    civilStatus,
    ATCLicenseExpiry,
    medicalLicenseExpiry,
    facility,
    Formik.setValues,
  ]);

  const [disabledField, setDisabledField] = useState({
    address: true,
    contactNumber: true,
    civilStatus: true,
    ATCLicenseExpiry: true,
    facility: true,
    medicalLicenseExpiry: true,
  });

  /**
   *
   * @param {Object} field disabledField
   * @param {Event} e Onclick event
   * @param {String} fieldKey The Formik.value key
   * @param {Object} fieldInitialValue The original initial value
   * @param {Boolean} submit Set true for submit button
   * @param {Boolean} cancel Set true for cancel button
   */
  const handleEdit = useCallback(
    (field, e, fieldKey, fieldInitialValue, submit = false, cancel = false) => {
      const values = Formik.values;
      const setFieldValue = Formik.setFieldValue;
      const submitForm = Formik.submitForm;

      e.preventDefault();
      setDisabledField((state) => ({ ...state, ...field }));

      submit &&
        !cancel &&
        fieldInitialValue &&
        fieldInitialValue !== values[fieldKey] &&
        submitForm();

      cancel &&
        !submit &&
        fieldKey &&
        fieldInitialValue &&
        setFieldValue(fieldKey, fieldInitialValue);
    },
    [Formik.values, Formik.setFieldValue, Formik.submitForm]
  );

  const [areaField, setAreaField] = useState(['']);

  return (
    <>
      <h2>Profile</h2>
      {firstname !== null && avatar !== null && facilities !== null ? (
        <form onSubmit={Formik.handleSubmit}>
          <span className="text-sm">Membership status: </span>
          <Badge type={membership_status === 'Pending' ? 'warning' : 'success'}>
            {membership_status}
          </Badge>
          <div className="">
            <CustomCard styles="sm:p-2 md:w-1/2 lg:w-1/3 xl:w-1/4">
              <ImageCropper initialImage={avatar} formik={Formik} />
            </CustomCard>
          </div>
          <CustomCard>
            <h3>Personal Information</h3>
            <CustomCard>
              <h4>Name</h4>
              <p>{`${firstname} ${middlename} ${surname} (${wiresign})`}</p>
            </CustomCard>
            <CustomCard>
              <h4>Address</h4>
              <Label>
                <Textarea
                  className={`mt-1 ${
                    Formik.errors.address && 'border-red-500'
                  }`}
                  rows="3"
                  value={Formik.values.address}
                  placeholder={address}
                  onChange={Formik.handleChange}
                  name="address"
                  disabled={disabledField.address}
                />
                {Formik.errors.address && (
                  <HelperText valid={false}>{Formik.errors.address}</HelperText>
                )}
              </Label>

              <Button
                type="button"
                disabled={Formik.errors.address}
                onClick={(e) =>
                  handleEdit(
                    { address: !disabledField.address },
                    e,
                    'address',
                    address,
                    !disabledField.address && true
                  )
                }
                className={`my-2 float-right`}
              >
                {disabledField.address ? 'Edit' : 'Save'}
              </Button>
              {!disabledField.address && (
                <Button
                  type="button"
                  className="float-right m-2"
                  onClick={(e) =>
                    handleEdit(
                      { address: true },
                      e,
                      'address',
                      address,
                      false,
                      true
                    )
                  }
                >
                  Cancel
                </Button>
              )}
            </CustomCard>
            <CustomCard>
              <h4>Contact Number</h4>
              <Label>
                <Input
                  className={`mt-1 ${
                    Formik.errors.contactNumber && 'border-red-500'
                  }`}
                  name="contactNumber"
                  value={Formik.values.contactNumber}
                  placeholder={contactNumber}
                  onChange={Formik.handleChange}
                  disabled={disabledField.contactNumber}
                  inputmode="tel"
                />
                {Formik.errors.contactNumber && (
                  <HelperText valid={false}>
                    {Formik.errors.contactNumber}
                  </HelperText>
                )}
              </Label>
              <Button
                type="button"
                disabled={Formik.errors.contactNumber}
                onClick={(e) =>
                  handleEdit(
                    { contactNumber: !disabledField.contactNumber },
                    e,
                    'contactNumber',
                    contactNumber,
                    !disabledField.contactNumber && true
                  )
                }
                className={`my-2 float-right`}
              >
                {disabledField.contactNumber ? 'Edit' : 'Save'}
              </Button>
              {!disabledField.contactNumber && (
                <Button
                  type="button"
                  className="float-right m-2"
                  onClick={(e) =>
                    handleEdit(
                      { contactNumber: true },
                      e,
                      'contactNumber',
                      contactNumber,
                      false,
                      true
                    )
                  }
                >
                  Cancel
                </Button>
              )}
            </CustomCard>
            <div className="grid-cols-2 gap-4 lg:grid">
              <CustomCard>
                <h4>Gender</h4>
                <p>{gender}</p>
              </CustomCard>
              <CustomCard>
                <h4>Civil Status</h4>
                {disabledField.civilStatus ? (
                  <p>{Formik.values.civilStatus}</p>
                ) : (
                  <div>
                    {civil_status.map((status, i) => (
                      <div key={i}>
                        <Label radio>
                          <Input
                            type="radio"
                            name="civilStatus"
                            onChange={Formik.handleChange}
                            value={status}
                            checked={
                              Formik.values.civilStatus === status && true
                            }
                          />
                          <span className="ml-2">{status}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
                <Button
                  type="button"
                  onClick={(e) =>
                    handleEdit(
                      { civilStatus: !disabledField.civilStatus },
                      e,
                      'civilStatus',
                      civilStatus,
                      !disabledField.civilStatus && true
                    )
                  }
                  className={`my-2 float-right`}
                >
                  {disabledField.civilStatus ? 'Edit' : 'Save'}
                </Button>
                {!disabledField.civilStatus && (
                  <Button
                    type="button"
                    className="float-right m-2"
                    onClick={(e) =>
                      handleEdit(
                        { civilStatus: true },
                        e,
                        'civilStatus',
                        civilStatus,
                        false,
                        true
                      )
                    }
                  >
                    Cancel
                  </Button>
                )}
              </CustomCard>
            </div>
            <div className="grid-cols-2 gap-4 lg:grid">
              <CustomCard>
                <h4>Birthday</h4>
                <p>{birthday}</p>
              </CustomCard>
              <CustomCard>
                <h4>Birthplace</h4>
                <p>{birthplace}</p>
              </CustomCard>
            </div>
          </CustomCard>
          <CustomCard>
            <h3>Employment Information</h3>
            <div className="grid-cols-3 gap-4 lg:grid">
              <CustomCard>
                <h4>Batch</h4>
                <p>{batch}</p>
              </CustomCard>
              <CustomCard>
                <h4>Date Employed</h4>
                <p>{dateEmployed}</p>
              </CustomCard>
              <CustomCard>
                <h4>License Number</h4>
                <p>{licenseNumber}</p>
              </CustomCard>
            </div>
            <div className="grid-cols-2 gap-4 lg:grid">
              <CustomCard>
                <h4>ATC License Expiry</h4>
                <Label>
                  <Input
                    type="date"
                    placeholder="MM/DD/YYYY"
                    value={Formik.values.ATCLicenseExpiry}
                    disabled={disabledField.ATCLicenseExpiry}
                    name="ATCLicenseExpiry"
                    onChange={Formik.handleChange}
                  />
                  {Formik.errors.ATCLicenseExpiry && (
                    <HelperText valid={false}>
                      {Formik.errors.ATCLicenseExpiry}
                    </HelperText>
                  )}
                </Label>
                <Button
                  type="button"
                  onClick={(e) =>
                    handleEdit(
                      { ATCLicenseExpiry: !disabledField.ATCLicenseExpiry },
                      e,
                      'ATCLicenseExpiry',
                      ATCLicenseExpiry,
                      !disabledField.ATCLicenseExpiry && true
                    )
                  }
                  disabled={Formik.errors.ATCLicenseExpiry}
                  className={`my-2 float-right`}
                >
                  {disabledField.ATCLicenseExpiry ? 'Edit' : 'Save'}
                </Button>
                {!disabledField.ATCLicenseExpiry && (
                  <Button
                    type="button"
                    className="float-right m-2"
                    onClick={(e) =>
                      handleEdit(
                        { ATCLicenseExpiry: true },
                        e,
                        'ATCLicenseExpiry',
                        ATCLicenseExpiry,
                        false,
                        true
                      )
                    }
                  >
                    Cancel
                  </Button>
                )}
              </CustomCard>
              <CustomCard>
                <h4>Medical License Expiry</h4>
                <Label>
                  <Input
                    type="date"
                    placeholder="MM/DD/YYYY"
                    value={Formik.values.medicalLicenseExpiry}
                    disabled={disabledField.medicalLicenseExpiry}
                    name="medicalLicenseExpiry"
                    onChange={Formik.handleChange}
                  />
                  {Formik.errors.medicalLicenseExpiry && (
                    <HelperText valid={false}>
                      {Formik.errors.medicalLicenseExpiry}
                    </HelperText>
                  )}
                </Label>
                <Button
                  type="button"
                  onClick={(e) =>
                    handleEdit(
                      {
                        medicalLicenseExpiry: !disabledField.medicalLicenseExpiry,
                      },
                      e,
                      'medicalLicenseExpiry',
                      medicalLicenseExpiry,
                      !disabledField.medicalLicenseExpiry && true
                    )
                  }
                  className={`my-2 float-right`}
                  disabled={Formik.errors.medicalLicenseExpiry}
                >
                  {disabledField.medicalLicenseExpiry ? 'Edit' : 'Save'}
                </Button>
                {!disabledField.medicalLicenseExpiry && (
                  <Button
                    type="button"
                    className="float-right m-2"
                    onClick={(e) =>
                      handleEdit(
                        { medicalLicenseExpiry: true },
                        e,
                        'medicalLicenseExpiry',
                        medicalLicenseExpiry,
                        false,
                        true
                      )
                    }
                  >
                    Cancel
                  </Button>
                )}
              </CustomCard>
            </div>
            <div className="">
              <h4>Facility History</h4>
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
                    {Formik.values.facility !== null &&
                      Formik.values.facility.map((fac, id) => (
                        <TableRow
                          key={id}
                          className={`${
                            id === Formik.values.facility.length - 1 &&
                            Formik.errors.facility &&
                            'bg-red-100'
                          }`}
                        >
                          <TableCell>{fac.facility}</TableCell>
                          <TableCell>{fac.area}</TableCell>
                          <TableCell>{fac.from}</TableCell>
                          <TableCell>{fac.to}</TableCell>
                          <TableCell>{fac.designation}</TableCell>
                        </TableRow>
                      ))}
                    {!disabledField.facility && (
                      <TableRow>
                        <TableCell>
                          <Select
                            name={`facility[${
                              Formik.values.facility.length - 1
                            }].facility`}
                            onChange={(e) => {
                              const ghost = document.getElementById('removeMe');
                              ghost && ghost.remove();
                              Formik.handleChange(e);
                              const areas = facilities.filter(
                                ({ facility }) => facility === e.target.value
                              )[0].area;
                              setAreaField(areas);
                              Formik.setFieldValue(
                                `facility[${
                                  Formik.values.facility.length - 1
                                }].area`,
                                areas[0]
                              );
                            }}
                          >
                            <option id="removeMe">--</option>
                            {facilities.map(({ facility }, i) => (
                              <option key={i}>{facility}</option>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select
                            name={`facility[${
                              Formik.values.facility.length - 1
                            }].area`}
                            onChange={Formik.handleChange}
                          >
                            {areaField.map((area, i) => (
                              <option key={i}>{area}</option>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="date"
                            name={`facility[${
                              Formik.values.facility.length - 1
                            }].from`}
                            onChange={Formik.handleChange}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="date"
                            name={`facility[${
                              Formik.values.facility.length - 1
                            }].to`}
                            onChange={Formik.handleChange}
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            name={`facility[${
                              Formik.values.facility.length - 1
                            }].designation`}
                            onChange={(e) => {
                              const ghost = document.getElementById(
                                'removeMeAlso'
                              );
                              ghost && ghost.remove();
                              Formik.handleChange(e);
                            }}
                          >
                            <option id="removeMeAlso">--</option>
                            {designation.map((d, i) => (
                              <option key={i}>{d}</option>
                            ))}
                          </Select>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                type="button"
                disabled={Formik.errors.facility}
                onClick={(e) => {
                  disabledField.facility &&
                    Formik.setFieldValue('facility', [
                      ...Formik.values.facility,
                      {
                        facility: '',
                        area: '',
                        from: '',
                        to: '',
                        designation: '',
                      },
                    ]);
                  handleEdit(
                    { facility: !disabledField.facility },
                    e,
                    'facility',
                    facility,
                    !disabledField.facility && true
                  );
                }}
                className={`my-2 float-right`}
              >
                {disabledField.facility ? 'Add Facility' : 'Save'}
              </Button>
              {!disabledField.facility && (
                <Button
                  type="button"
                  className="float-right m-2"
                  layout="outline"
                  onClick={(e) =>
                    handleEdit(
                      { facility: true },
                      e,
                      'facility',
                      facility,
                      false,
                      true
                    )
                  }
                >
                  Cancel
                </Button>
              )}
            </div>
          </CustomCard>
        </form>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Profile;
