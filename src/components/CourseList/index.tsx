import React from 'react';
import styled from 'styled-components';
import { Course } from '../../graphql';
import CourseItem from './CourseItem';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

type Props = {
  courses?: Course[];
};

const CourseList = ({ courses }: Props) => {
  return (
    <Wrapper>
      {courses?.map((item) => (
        <CourseItem key={item.id} {...item} />
      ))}
    </Wrapper>
  );
};

export default CourseList;
