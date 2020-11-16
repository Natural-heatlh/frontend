import React, { Fragment } from 'react';
import Header from '../../components/Header';
import PageHead from '../../components/PageHead';
import CourseList from '../../components/CourseList';
import PageContainer from '../../components/PageContainer';

const MyCourses = () => {
  return (
    <PageContainer pageTitle="Мои курсы">
      <CourseList />
    </PageContainer>
  );
};

export default MyCourses;
