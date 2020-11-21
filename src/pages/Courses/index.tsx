import React from 'react';
import CourseList from '../../components/CourseList';
import PageContainer from '../../components/PageContainer';

const Courses = () => {
  return (
    <PageContainer pageTitle="Курсы">
      <CourseList />
    </PageContainer>
  );
};

export default Courses;
