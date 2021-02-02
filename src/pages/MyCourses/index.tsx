import React, { useContext, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import PageContainer from '../../components/PageContainer';
import { AuthContext } from '../../components/Auth/AuthCheck';
import Preloader from '../../components/Preloader';
import { Course } from '../../graphql';
import UserCourseList from '../../components/UserCourseList';
import { setCourses } from '../../slices/admin/courses';
import { usePageTitle } from '../../hooks/usePageTitle';
import query from '../Courses/query.graphql';

const MyCourses = () => {
  usePageTitle('Мои курсы');
  const userContext = useContext(AuthContext);
  const { data, loading } = useQuery(query.CoursesQuery);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.courses) {
      dispatch(setCourses(data?.courses));
    }
  }, [data, dispatch]);

  const availableCourses = useMemo(() => {
    return data?.courses.filter((item: Course) =>
      userContext?.courses?.find(
        (course) => course?.courseId === item?.courseId
      )
    );
  }, [data, userContext]);

  if (loading) return <Preloader />;

  return (
    <PageContainer pageTitle="Мои курсы">
      <UserCourseList courses={availableCourses as Course[]} />
    </PageContainer>
  );
};

export default MyCourses;
