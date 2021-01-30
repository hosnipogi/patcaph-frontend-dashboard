import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../contexts/AuthUserContext';
import { SidebarContext } from '../contexts/SidebarContext';

import { Avatar, Badge, Card } from '@windmill/react-ui';
import { MenuIcon } from './icons';

import { HOME, LOGOUT } from '../lib/config/URLs';
import Api from '../lib/services/api';

const LinkStyles =
  'py-4 px-8 text-sm hover:text-blue-600 text-gray-500 hover:text-gray-800 font-bold';

const Header = () => {
  const [displayAccountSettings, setDisplayAccountSettings] = useState(false);

  const handleAccountSettings = () =>
    setDisplayAccountSettings(!displayAccountSettings);

  const { state } = useContext(AuthUserContext);
  const { toggleSidebar } = useContext(SidebarContext);

  useEffect(() => {
    const body = document.querySelector('body');
    body.onclick = function () {
      displayAccountSettings && setDisplayAccountSettings(false);
    };
  }, [displayAccountSettings]);

  return (
    <header className="fixed top-0 z-40 w-full bg-white shadow-sm lg:relative lg:mt-0">
      <div className="container relative flex justify-between w-11/12 py-4 mx-auto">
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        <Badge type="success">
          {state.user.role && state.user.role.toString().replace(/,/g, ' - ')}
        </Badge>
        <div className="flex items-center justify-center">
          <h4 className="mr-2">{state.user.email}</h4>
          <button type="button" onClick={handleAccountSettings}>
            <Avatar src={state.user.avatar} alt="Profile" />
          </button>
        </div>
        <Card
          className={`${
            !displayAccountSettings ? 'hidden' : 'flex'
          } absolute mt-12 right-0 flex-col`}
        >
          <Link
            className={`${LinkStyles} border-b-2 border-gray-100`}
            to="/profile"
          >
            Update Profile
          </Link>
          <button
            type="button"
            className={`${LinkStyles} text-left`}
            onClick={() => {
              new Api({
                url: LOGOUT,
                method: 'post',
              })
                .fetch()
                .then(() => {
                  alert('Logged out');
                  window.location.href = HOME;
                })
                .catch((e) => {
                  console.log(e);
                  this.abort();
                });
            }}
          >
            Logout
          </button>
        </Card>
      </div>
    </header>
  );
};

export default Header;
