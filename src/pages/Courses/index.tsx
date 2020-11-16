import React, { Fragment } from 'react';
import Header from '../../components/Header';
import PageHead from '../../components/PageHead';
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
