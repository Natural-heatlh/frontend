import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useQuery } from '@apollo/client';
import { Button } from 'antd';
import Header from '../../components/Header';
import AvailableCourse from '../../components/Landing/AvailableCourses';
import Container from '../../components/Container';
import Main from '../../components/Landing/Main';
import Preloader from '../../components/Preloader';
import { CoursesQueryQuery } from '../Courses/query.generated';
import query from './query.graphql';



const CourseList = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 0;
`;

const Courses = styled.div`
  background: #e5e5e5;
  padding-top: 100px;

  h3 {
    font-size: 24px;
    font-weight: 700px;
    line-height: 31px;
    margin-bottom: 20px;
    text-align: center;
  }
`;

const VideoContainer = styled(Container)`
  display: flex;
  justify-content: center;
`;

const PlayerWrapper = styled.div`
  border: 20px solid rgba(0, 0, 0, 0.85);
  max-width: 100%;
  display: inline-flex;
  max-width: 780px;
  width: 100%;
  margin: 0 auto;
  height: 560px;
`;

const StyledPlayer = styled(ReactPlayer)`
  max-width: 100%;
  height: 100%;
  width: 100%;
`;

const VideoSection = styled.section`
  padding-top: 100px;
  padding-bottom: 100px;
  background: #e5e5e5;
`;

const ActionSection = styled.div`
  background: #74c8c2;
  padding-top: 100px;
  padding-bottom: 100px;
  color: #fff;
  text-align: center;
`;

const ActionContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ActionSectionTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  line-height: 31px;
  margin-bottom: 30px;
  color: #fff;
`;

const ActionSectionDescription = styled.p`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  display: flex;
  max-width: 80%;
  width: 100%;
  margin: 0 auto 80px auto;
`;

const Landing = () => {
  const { data, loading, error } = useQuery<CoursesQueryQuery>(
    query.LandingCourses
  );

  if (loading) return <Preloader />;
  if (error) {
    console.log(error);
  }

  return (
    <React.Fragment>
      <Header />
      <Main />
      <Courses>
        <Container>
          <h3>Для вас доступны {data?.courses?.length || 0} онлайн курсов:</h3>
          <CourseList>
            {data?.courses?.map((item) =>
              item ? (
                <AvailableCourse
                  key={item?.courseId}
                  image={item?.image}
                  title={item?.title}
                  description={item?.description}
                />
              ) : null
            )}
          </CourseList>
        </Container>
      </Courses>
      <VideoSection>
        <VideoContainer>
          <PlayerWrapper>
            <StyledPlayer
              url="https://www.youtube.com/watch?v=VGiTppRObRg"
              width="100%"
              height="100%"
              config={{
                youtube: {
                  playerVars: {
                    rel: 0,
                    controls: 1
                  }
                }
              }}
            />
          </PlayerWrapper>
        </VideoContainer>
      </VideoSection>

      <ActionSection>
        <ActionContainer>
          <ActionSectionTitle>
            Все, что вам нужно, чтобы добиться успеха
          </ActionSectionTitle>
          <ActionSectionDescription>
            Natural Health Академия — это не только уникальная познавательная
            платформа, но и путеводитель в мир успешного бизнеса! Вся полезная
            информация, дополненная интерактивом, поможет приобрести все
            необходимые навыки и углубить свои познания в предпринимательском
            деле. С Natural Health вы станете сильным лидером с регулярным
            доходом и возможностью постоянно совершенствоваться и двигаться
            вперед!
          </ActionSectionDescription>
          <Button style={{ maxWidth: '300px', width: '100%' }} type="primary">
            <Link to="/auth/login">Перейти к обучению</Link>
          </Button>
        </ActionContainer>
      </ActionSection>
    </React.Fragment>
  );
};

export default Landing;
