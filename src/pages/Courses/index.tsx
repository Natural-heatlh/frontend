import React, { useCallback, useContext } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import CourseList from '../../components/CourseList';
import PageContainer from '../../components/PageContainer';
import Preloader from '../../components/Preloader';
import { usePageTitle } from '../../hooks/usePageTitle';
import { AuthContext } from '../../components/Auth/AuthCheck';
import query from './query.graphql';

const Courses = () => {
  usePageTitle('Список курсов');
  const { data, loading } = useQuery(query.CoursesQuery);
  const user = useContext(AuthContext);

  const [buyCourse] = useMutation(query.BuyCourse);
  const handleBuyCourse = useCallback(
    async (id: string) => {
      return await buyCourse({ variables: { id } });
    },
    [buyCourse]
  );

  const availableCourses = user?.courses?.map<string>(
    (item) => item?.courseId as string
  );

  if (loading) return <Preloader />;

  return (
    <PageContainer pageTitle="Курсы">
      {data?.courses && data?.courses.length > 0 ? (
        <CourseList
          onClick={handleBuyCourse}
          courses={data?.courses}
          availableCourses={availableCourses}
        />
      ) : (
        'No data'
      )}
    </PageContainer>
  );
};

export default Courses;
