import React from 'react';
import styled from 'styled-components';
import { Course } from '../../graphql';
import CourseItem from './CourseItem';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

type Props = {
  courses?: Course[];
  onClick?: (id: string) => void;
  availableCourses?: string[];
};

const CourseList = ({
  courses,
  onClick,
  availableCourses
}: Props) => {
  return (
    <Wrapper>
      {courses?.map((item) => (
        <CourseItem
          onClick={onClick}
          isAvailable={availableCourses?.includes(item.id)}
          key={item.id}
          {...item}
        />
      ))}
    </Wrapper>
  );
};

export default CourseList;
