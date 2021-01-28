import React, { useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';
import AdminHeader from '../../components/Admin/Components/Header';
import { AuthContext } from '../../components/Auth/AuthCheck';
import Courses from './Courses';
import Edit from './Edit';
import Add from './Add';

const Admin = () => {
  const user = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (user?.role !== 'admin') {
      history.replace('/');
    }
  }, [location, history, user]);

  return (
    <React.Fragment>
      <AdminHeader />
      <Switch>
        <Route path="/admin/courses" component={Courses} exact />
        <Route path="/admin/courses/:id" component={Edit} exact />
        <Route path="/admin/add-course" component={Add} exact />
      </Switch>
    </React.Fragment>
  );
};

export default Admin;
