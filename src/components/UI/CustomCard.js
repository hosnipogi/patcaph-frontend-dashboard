import { Card } from '@windmill/react-ui';

const CustomCard = ({ children, styles }) => {
  return (
    <Card className={`p-4 mt-4 block ${styles && styles}`}>{children}</Card>
  );
};

export default CustomCard;
