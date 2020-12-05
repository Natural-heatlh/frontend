import React, { useContext, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import CourseList from '../../components/CourseList';
import PageContainer from '../../components/PageContainer';
import { AuthContext } from '../../components/Auth/AuthCheck';
import query from '../Courses/query.graphql';
import Preloader from '../../components/Preloader';
import { CoursesQueryQuery } from '../Courses/query.generated';
import { Course } from '../../graphql';

const MyCourses = () => {
  const userContext = useContext(AuthContext);
  const { data, loading } = useQuery<CoursesQueryQuery>(query.CoursesQuery);

  const availableCourses = useMemo(() => {
    return data?.courses.filter((item) => {
      if (
        userContext?.courses?.find((course) => course?.courseId === item?.id)
      ) {
        return item;
      }
    });
  }, [data]);

  if (loading) return <Preloader />;

  return (
    <PageContainer pageTitle="Мои курсы">
      <CourseList courses={availableCourses as Course[]} isAvailable />
    </PageContainer>
  );
};

export default MyCourses;
