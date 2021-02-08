import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import AuthCheck from '../../components/Auth/AuthCheck';
import { setCourses } from '../../slices/admin/courses';
import Preloader from '../../components/Preloader';
import Admin from '../Admin';
import Courses from '../Courses';
import MyCourses from '../MyCourses';
import Course from '../Course';
import Profile from '../Profile';
import CoursePresentation from '../CoursePresentation';
import query from '../Courses/query.graphql';
import NotFound from '../NotFound';

const Protected = () => {
  const dispatch = useDispatch();
  const { data, loading } = useQuery(query.CoursesQuery);

  useEffect(() => {
    if (data?.courses) {
      dispatch(setCourses(data?.courses));
    }
  }, [data, dispatch]);

  if (loading) return <Preloader />;

  return (
    <AuthCheck>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/courses" exact>
          <Courses />
        </Route>
        <Route path="/my-courses" exact>
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
          path="/presentation/:id"
          component={(props: any) => <CoursePresentation {...props} />}
          exact
        />
        <Route
          path="/course/:id/lecture/:lectureId"
          component={(props: any) => (
            <Course key={props.match.params?.lectureId} {...props} />
          )}
          exact
        />
        <Route component={NotFound} />
      </Switch>
    </AuthCheck>
  );
};

export default Protected;
