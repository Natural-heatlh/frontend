import React from 'react';
import { useQuery } from '@apollo/client';
import PageContainer from '../../components/PageContainer';
import Preloader from '../../components/Preloader';
import { Course } from '../../graphql';
import UserCourseList from '../../components/UserCourseList';
import { usePageTitle } from '../../hooks/usePageTitle';
import query from './query.graphql';

const MyCourses = () => {
  usePageTitle('Мои курсы');
  const { data, loading } = useQuery(query.UserCourses);

  if (loading) return <Preloader />;

  return (
    <PageContainer pageTitle="Мои курсы">
      <UserCourseList courses={data?.userCourses as Course[]} />
    </PageContainer>
  );
};

export default MyCourses;
