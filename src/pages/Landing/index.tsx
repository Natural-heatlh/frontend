import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import AvailableCourse from '../../components/Landing/AvailableCourses';
import { coursesData } from '../../components/Landing/data';
import Container from '../../components/Container';
import Main from '../../components/Landing/Main';

const CourseList = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 0;
`;

const Courses = styled.div`
  padding-top: 100px;

  h3 {
    font-size: 24px;
    font-weight: 700px;
    line-height: 31px;
    margin-bottom: 20px;
    text-align: center;
  }
`;

const Landing = () => {
  return (
    <React.Fragment>
      <Header />
      <Main />
      <Courses>
        <Container>
          <h3>Для вас доступны 9 онлайн курсов:</h3>
          <CourseList>
            {coursesData.map((item) => (
              <AvailableCourse
                key={item.title}
                image={item.image}
                title={item.title}
                description={item.description}
              />
            ))}
          </CourseList>
        </Container>
      </Courses>
    </React.Fragment>
  );
};

export default Landing;
