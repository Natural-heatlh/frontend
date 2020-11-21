import React from 'react';
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
