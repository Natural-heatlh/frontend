import React from 'react';
import styled from 'styled-components';
import { Course } from '../../graphql';
import Slider from '../Slider';
import AboutCourse from './AboutCourse';

const Wrapper = styled.div`
  width: calc(100% - 320px);
  height: 100%;
`;

const CourseContent = () => {
  return (
    <Wrapper>
      <Slider />
      <AboutCourse />
    </Wrapper>
  );
};

export default CourseContent;
