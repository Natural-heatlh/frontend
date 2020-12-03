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
  isAvailable?: boolean;
  onClick?: (id: string) => void;
};

const CourseList = ({ courses, isAvailable, onClick }: Props) => {

  return (
    <Wrapper>
      {courses?.map((item) => (
        <CourseItem
          onClick={onClick}
          isAvailable={isAvailable}
          key={item.id}
          {...item}
        />
      ))}
    </Wrapper>
  );
};

export default CourseList;
