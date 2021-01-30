import { useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@windmill/react-ui';
import { CustomCard, Loading } from '../components/UI';

const sample = [
  {
    month: new Date().getMonth() + 1,
    paid: true,
  },
];

const Contributions = () => {
  const [contributions, setContributions] = useState(null);

  useEffect(() => {
    setContributions(sample);
  }, [setContributions]);

  return (
    <div>
      <h2>Contributions</h2>
      <p>View contributions history</p>
      <CustomCard>
        <div className="grid-cols-2 gap-4 lg:grid">
          <CustomCard styles="sm:mt-0">
            <h4>Last Remittance Date</h4>
            {/* <p>{new Date().toUTCString()}</p> */}
          </CustomCard>
          <CustomCard styles="sm:mt-0">
            <h4>Total No. of Contributions</h4>
            {/* <p>1</p> */}
          </CustomCard>
        </div>
        {contributions !== null ? (
          <TableContainer className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>Paid</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contributions.map((c, i) => (
                  <TableRow key={i}>
                    <TableCell>{c.month}</TableCell>
                    <TableCell>{c.paid}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Loading />
        )}
      </CustomCard>
    </div>
  );
};

export default Contributions;
