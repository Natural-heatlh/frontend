import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminHeader from '../../components/Admin/Components/Header';
import Courses from './Courses';
import Course from './Course';
import Add from './Add';

const Admin = (props: any) => {
  return (
    <React.Fragment>
      <AdminHeader />
      <Switch>
        <Route path="/admin/courses" component={Courses} exact />
        <Route path="/admin/courses/:id" component={Course} exact />
        <Route path="/admin/add-course" component={Add} exact />
      </Switch>
    </React.Fragment>
  );
};

export default Admin;
