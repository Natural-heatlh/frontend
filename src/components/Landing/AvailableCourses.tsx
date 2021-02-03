import React from 'react';
import styled from 'styled-components';

const AvailableCourseWrapper = styled.div`
  padding: 12px;
  box-sizing: border-box;
  max-width: calc(100% / 3);
`;

const AppContent = styled.div`
  padding: 8px 24px 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 6px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-width: 0;
  background: #fff;
  height: 100%;
`;

const CourseTitle = styled.h4`
  font-size: 24px;
  line-height: 31px;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 24px;
`;

const CourseImageWrapper = styled.div`
  height: 270px;
  > * {
    width: 100%;
  }
`;

type Props = {
  image?: string | null;
  title?: string | null;
  description?: string | null;
};

const AvailableCourse = ({ image, title, description }: Props) => {
  return (
    <AvailableCourseWrapper>
      <AppContent>
        <CourseImageWrapper>
          <img src={image as string} alt="title" />
        </CourseImageWrapper>
        <CourseTitle>{title}</CourseTitle>
        <Description>{description}</Description>
      </AppContent>
    </AvailableCourseWrapper>
  );
};

export default AvailableCourse;
