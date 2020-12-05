import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import AuthCheck from '../../components/Auth/AuthCheck';
import Admin from '../Admin';
import Courses from '../Courses';
import MyCourses from '../MyCourses';
import Course from '../Course';
import query from '../Courses/query.graphql';
import Preloader from '../../components/Preloader';
import { setCourses } from '../../slices/actions';

const Protected = () => {
  const { data, loading, error } = useQuery(query.CoursesQuery);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading && !error) {
      dispatch(setCourses(data.courses));
    }
  }, [data]);

  if (loading) return <Preloader />;

  return (
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
        <Route
          path="/course/:id"
          component={(props: any) => <Course {...props} />}
          exact
        />
        <Route
          path="/course/:id/lecture/:lectureId"
          component={(props: any) => <Course {...props} />}
          exact
        />
      </Switch>
    </AuthCheck>
  );
};

export default Protected;
