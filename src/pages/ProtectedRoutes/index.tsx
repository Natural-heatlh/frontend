import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthCheck from '../../components/Auth/AuthCheck';
import Admin from '../Admin';
import Courses from '../Courses';
import MyCourses from '../MyCourses';
import Course from '../Course';
import Profile from '../Profile';

const Protected = () => (
  <AuthCheck>
    <Switch>
      <Route path="/admin">
        <Admin />
      </Route>
      <Route path="/courses">
        <Courses />
      </Route>
      <Route path="/my-courses">
        <MyCourses />
      </Route>
      <Route key="profile" path="/profile">
        <Profile />
      </Route>
      <Route
        path="/course/:id"
        component={(props: any) => <Course {...props} />}
        exact
      />
      <Route
        path="/course/:id/lecture/:lectureId"
        component={(props: any) => (
          <Course key={props.match.params?.lectureId} {...props} />
        )}
        exact
      />
    </Switch>
  </AuthCheck>
);

export default Protected;
