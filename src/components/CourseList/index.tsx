import React from 'react';
import { Course } from '../../graphql';
import Container from '../Container';
import CourseItem from './CourseItem';

type Props = {
  courses?: Course[];
};

const CourseList = ({ courses }: Props) => {
  return (
    <Container>
      <CourseItem />
    </Container>
  );
};

export default CourseList;
