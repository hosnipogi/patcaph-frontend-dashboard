import { Link } from 'react-router-dom';
import { Card } from '@windmill/react-ui';

const Dashboard = () => {
  return (
    <>
      <h2>Dashboard</h2>
      <div className="p-4 my-4 text-sm bg-red-200 rounded-md shadow-xs ">
        <h4 className="font-bold text-red-600">Notice</h4>
        <p className="text-red-500">Lorem ipsum dolor!</p>
      </div>
      <div className="p-4 my-4 font-bold text-yellow-600 bg-yellow-200 rounded-md shadow-xs ">
        Announcement
      </div>
      <Link to="/profile" className="w-full text-sm font-bold text-blue-600">
        Update Profile
      </Link>
      <Card className="p-4 my-4">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum
        provident, explicabo id recusandae ex libero accusamus tempora.
        Cupiditate in eligendi beatae, dicta laudantium ducimus veritatis
        doloribus fugiat? Voluptate, distinctio aperiam. Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Odio iste necessitatibus accusamus,
        quam deleniti blanditiis asperiores distinctio ipsam totam voluptates
        non cupiditate animi amet maiores fuga velit tempore minima optio! Lorem
        ipsum dolor, sit amet consectetur adipisicing elit. Debitis, sint
        aspernatur. Voluptatibus quasi quidem, quod inventore quibusdam nesciunt
        consequuntur, voluptas vitae laborum numquam, repellat assumenda quaerat
        sed earum similique nulla!
      </Card>
      <Card className="p-4 my-4">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum
        provident, explicabo id recusandae ex libero accusamus tempora.
        Cupiditate in eligendi beatae, dicta laudantium ducimus veritatis
        doloribus fugiat? Voluptate, distinctio aperiam. Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Odio iste necessitatibus accusamus,
        quam deleniti blanditiis asperiores distinctio ipsam totam voluptates
        non cupiditate animi amet maiores fuga velit tempore minima optio! Lorem
        ipsum dolor, sit amet consectetur adipisicing elit. Debitis, sint
        aspernatur. Voluptatibus quasi quidem, quod inventore quibusdam nesciunt
        consequuntur, voluptas vitae laborum numquam, repellat assumenda quaerat
        sed earum similique nulla!
      </Card>
      <Card className="p-4 my-4">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum
        provident, explicabo id recusandae ex libero accusamus tempora.
        Cupiditate in eligendi beatae, dicta laudantium ducimus veritatis
        doloribus fugiat? Voluptate, distinctio aperiam. Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Odio iste necessitatibus accusamus,
        quam deleniti blanditiis asperiores distinctio ipsam totam voluptates
        non cupiditate animi amet maiores fuga velit tempore minima optio! Lorem
        ipsum dolor, sit amet consectetur adipisicing elit. Debitis, sint
        aspernatur. Voluptatibus quasi quidem, quod inventore quibusdam nesciunt
        consequuntur, voluptas vitae laborum numquam, repellat assumenda quaerat
        sed earum similique nulla!
      </Card>
    </>
  );
};

export default Dashboard;
