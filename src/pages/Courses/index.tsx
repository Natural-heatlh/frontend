import React from 'react';
import { useQuery } from '@apollo/client';
import CourseList from '../../components/CourseList';
import PageContainer from '../../components/PageContainer';
import Preloader from '../../components/Preloader';
import query from './query.graphql';

const Courses = () => {
  const { data, loading, error } = useQuery(query.CoursesQuery);
  if (loading) return <Preloader />;

  return (
    <PageContainer pageTitle="Курсы">
      {data?.courses && data?.courses.length > 0 ? (
        <CourseList courses={data?.courses} />
      ) : (
        'No data'
      )}
    </PageContainer>
  );
};

export default Courses;
