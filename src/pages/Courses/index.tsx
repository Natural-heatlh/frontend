import React, { useCallback, useContext } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Modal } from 'antd';
import CourseList from '../../components/CourseList';
import PageContainer from '../../components/PageContainer';
import Preloader from '../../components/Preloader';
import { usePageTitle } from '../../hooks/usePageTitle';
import { AuthContext } from '../../components/Auth/AuthCheck';
import axios from '../../helpers/axios';
import query from './query.graphql';

const Courses = () => {
  usePageTitle('Список курсов');
  const { data, loading, error } = useQuery(query.CoursesQuery);
  const user = useContext(AuthContext);

  const availableCourses = user?.courses?.map<string>(
    (item) => item?.courseId as string
  );

  if (loading) return <Preloader />;
  if (error) {
    Modal.error({
      title: 'Ошибка',
      content: error.message
    });
  }

  return (
    <PageContainer pageTitle="Курсы">
      {data?.courses && data?.courses.length > 0 ? (
        <CourseList
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
