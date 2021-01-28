import React, { useContext, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import PageContainer from '../../components/PageContainer';
import { AuthContext } from '../../components/Auth/AuthCheck';
import Preloader from '../../components/Preloader';
import { Course } from '../../graphql';
import UserCourseList from '../../components/UserCourseList';
import { usePageTitle } from '../../hooks/usePageTitle';
import { CoursesQueryQuery } from '../Courses/query.generated';
import query from '../Courses/query.graphql';

const MyCourses = () => {
  usePageTitle('Мои курсы');
  const userContext = useContext(AuthContext);
  const { data, loading } = useQuery<CoursesQueryQuery>(query.CoursesQuery);

  const availableCourses = useMemo(() => {
    return data?.courses.filter((item) =>
      userContext?.courses?.find((course) => course?.courseId === item?.courseId)
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
