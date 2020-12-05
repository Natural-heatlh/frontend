import React from 'react';
import styled from 'styled-components';
import { Course } from '../../graphql';
import UserCourseItem from './CourseItem';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

type Props = {
  courses?: Course[];
  isAvailable?: boolean;
  onClick?: (id: string) => void;
};

const UserCourseList = ({ courses }: Props) => {
  return (
    <Wrapper>
      {courses?.map((item) => (
        <UserCourseItem key={item.id} {...item} />
      ))}
    </Wrapper>
  );
};

export default UserCourseList;
