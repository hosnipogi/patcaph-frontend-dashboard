import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
  Badge,
  Button,
  Input,
  Select,
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@windmill/react-ui';
import { CustomCard, Loading } from '../components/UI/';

const styles = 'mt-2';

const sample = [
  {
    flightNumber: '5J855',
    dateOfFlight: new Date().toISOString(),
    route: 'MNL-ZAM',
    type: 'FBA',
    status: 'Pending',
  },
  {
    flightNumber: '5J855',
    dateOfFlight: new Date().toISOString(),
    route: 'MNL-ZAM',
    type: 'FBA',
    status: 'Rejected',
  },
  {
    flightNumber: '5J855',
    dateOfFlight: new Date().toISOString(),
    route: 'MNL-ZAM',
    type: 'FBA',
    status: 'Approved',
  },
];

const flightRequestType = ['FBA', 'DRF'];
const FBA = () => {
  const [fbaHistory, setFbaHistory] = useState(null);
  useEffect(() => setFbaHistory(sample), []);

  const Formik = useFormik({
    initialValues: {
      flightNumber: null,
      dateOfFlight: null,
      type: 'FBA',
      route: null,
    },
    onSubmit: console.log,
  });
  return (
    <div>
      <h2>FBA</h2>
      <h2 className="text-red-600">SAMPLE ONLY -- WORK IN PROGRESS</h2>
      <div className="mb-4">
        <h4>Request for FBA/DRF</h4>
        <CustomCard>
          <form onSubmit={Formik.handleSubmit}>
            <div className="grid-cols-4 gap-4 lg:grid">
              <Input
                className={styles}
                onChange={Formik.handleChange}
                name="flightNumber"
                placeholder="flightNumber"
              />
              <Input
                className={styles}
                type="date"
                onChange={Formik.handleChange}
                name="dateOfFlight"
                placeholder="dateOfFlight"
              />
              <Input
                className={styles}
                onChange={Formik.handleChange}
                name="route"
                placeholder="route"
              />
              <Select
                className={styles}
                onChange={Formik.handleChange}
                name="type"
              >
                {flightRequestType.map((type, i) => (
                  <option key={i}>{type}</option>
                ))}
              </Select>
            </div>
            <Button type="submit" className="mt-4">
              Submit
            </Button>
          </form>
        </CustomCard>
      </div>
      <div>
        <h4>FBA/DRF History</h4>
        {fbaHistory !== null ? (
          <CustomCard>
            <TableContainer className="mt-2 text-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>Flight Number</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Route</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fbaHistory.map((fba, i) => (
                    <TableRow key={i}>
                      <TableCell>{fba.flightNumber}</TableCell>
                      <TableCell>{fba.dateOfFlight}</TableCell>
                      <TableCell>{fba.route}</TableCell>
                      <TableCell>{fba.type}</TableCell>
                      <TableCell>
                        <Badge
                          type={
                            fba.status === 'Pending'
                              ? 'warning'
                              : fba.status === 'Rejected'
                              ? 'danger'
                              : 'success'
                          }
                        >
                          {fba.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CustomCard>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default FBA;
