import { Suspense, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Sidebar from './Sidebar/';
import Header from './Header';
import routes from '../routes/routes';
import { AuthUserContext } from '../contexts/AuthUserContext';
import { Loading } from '../components/UI/';
import checkIfUserHasRole from '../lib/utils/checkIfExistsInArray';

const Layout = () => {
  const { state } = useContext(AuthUserContext);

  return (
    <div className="grid grid-cols-12">
      <Sidebar />
      <div className={`col-span-12 lg:col-span-9 xl:col-span-10 bg-gray-100`}>
        <Header />
        <div className="container w-11/12 pb-10 mx-auto mt-24 lg:h-screen-90 lg:overflow-y-auto lg:mt-4">
          <Suspense fallback={<Loading />}>
            <Switch>
              {routes.map((route, index) =>
                !route.protectedRoutes ? (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.path === '/' && true}
                    component={route.component}
                  />
                ) : (
                  checkIfUserHasRole(state.user.role, ['admin', 'treasurer']) &&
                  route.protectedRoutes.map((pr, i) => (
                    <Route
                      key={`${index}-${i}`}
                      path={pr.route}
                      component={pr.component}
                    />
                  ))
                )
              )}
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Layout;
