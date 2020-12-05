import React, { useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import CourseList from '../../components/CourseList';
import PageContainer from '../../components/PageContainer';
import Preloader from '../../components/Preloader';
import query from './query.graphql';

const Courses = () => {
  const { data, loading, error } = useQuery(query.CoursesQuery);
  const [buyCourse] = useMutation(query.BuyCourse);
  const handleBuyCourse = useCallback(
    async (id: string) => {
      return await buyCourse({ variables: { id } });
    },
    [data, loading]
  );

  if (loading) return <Preloader />;

  return (
    <PageContainer pageTitle="Курсы">
      {data?.courses && data?.courses.length > 0 ? (
        <CourseList onClick={handleBuyCourse} courses={data?.courses} />
      ) : (
        'No data'
      )}
    </PageContainer>
  );
};

export default Courses;
