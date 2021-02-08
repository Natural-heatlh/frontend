import React from 'react';
import styled from 'styled-components';
import parser from 'html-react-parser';


const CourseDescriptionWrapper = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 50px;

  h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  h3 {
    font-size: 18px;
    line-height: 24px;
  }
`;

type Props = {
  description?: string | null;
};

const AboutCourse = ({ description }: Props) => {
  return (
    <CourseDescriptionWrapper>
      <h2>Об этом курсе</h2>

      {description ? parser(description) : ''}
    </CourseDescriptionWrapper>
  );
};

export default AboutCourse;
