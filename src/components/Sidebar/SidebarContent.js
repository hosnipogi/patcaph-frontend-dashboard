import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../UI/';
import routes from '../../routes/routes';
import { AuthUserContext } from '../../contexts/AuthUserContext';
import { HOME } from '../../lib/config/URLs';
import checkIfUserHasRole from '../../lib/utils/checkIfExistsInArray';

const twStyles =
  'p-4 border-l-8 border-transparent block lg:hover:border-blue-500 lg:hover:bg-blue-100 hover:text-gray-800 text-sm text-gray-500 font-bold cursor-pointer';

const ActiveRouteStyle = 'border-blue-600 bg-gray-100 text-gray-800';

const Sidebar = () => {
  const location = useLocation();
  const { state } = useContext(AuthUserContext);

  return (
    <>
      <a href={HOME} className="block pt-6">
        <Logo fill="#333" height="1.4rem" width="100%" />
      </a>
      <ul className="my-10">
        {routes.map((route, i) => (
          <React.Fragment key={i}>
            {!route.protectedRoutes ? (
              <>
                {route.showOnSidebar && (
                  <li>
                    <Link
                      className={`${twStyles} ${
                        location.pathname === route.path && ActiveRouteStyle
                      }`}
                      to={route.path}
                    >
                      {route.name}
                    </Link>
                  </li>
                )}
              </>
            ) : (
              <>
                {checkIfUserHasRole(state.user.role, [
                  'admin',
                  'treasurer',
                ]) && (
                  <>
                    <hr />
                    <h4 className="p-4">Admin Panel</h4>
                    {route.protectedRoutes.map((pr, index) => (
                      <li key={index}>
                        <Link
                          className={`${twStyles} ${
                            location.pathname === pr.path && ActiveRouteStyle
                          }`}
                          to={pr.path}
                        >
                          {pr.name}
                        </Link>
                      </li>
                    ))}
                  </>
                )}
              </>
            )}
          </React.Fragment>
        ))}
      </ul>
    </>
  );
};

export default Sidebar;
