import React, { useCallback, useContext, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import { usePageTitle } from '../../hooks/usePageTitle';
import Preloader from '../../components/Preloader';
import axios from '../../helpers/axios';
import { AuthContext } from '../../components/Auth/AuthCheck';
import PresentationPageHead from './PageHead';
import query from './query.graphql';
import Content from './Content';

const Footer = styled.div`
  font-size: 24px;
  display: flex;
  justify-content: flex-end;
`;

const BuySectionWrapper = styled.div`
  width: 50%;
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  font-weight: bold;

  p {
    display: block;
    margin-bottom: 20px;

    span {
      font-size: 60px;
    }
  }
`;

const CoursePresentation = (props: any) => {
  const { id } = props.match.params;
  const user = useContext(AuthContext);

  const { data, loading } = useQuery(query.Course, {
    variables: {
      id
    }
  });

  usePageTitle(data?.course?.title);

  const handleBuyCourse = useCallback(async () => {
    if (data?.course) {
      try {
        const result = await axios.post('/payment/buy-course', {
          courseId: id,
          courseName: data.course?.title,
          email: user?.email,
          partnerID: user?.partnerID,
          price: data?.course?.price || 30
        });

        if (result?.data?.redirectUrl) {
          window.location = result?.data?.redirectUrl;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [user, data, id]);

  const isBought = useMemo(() => {
    if (user?.courses) {
      return !!user.courses?.find(
        (item) => item?.courseId === data?.course?.courseId
      );
    }
    return false;
  }, [data, user]);

  if (loading) return <Preloader />;

  return (
    <PageContainer
      pageTitle={data?.course?.title}
      PageHeadContainer={(props) => (
        <>
          <PresentationPageHead
            {...props}
            description={data?.course?.description}
            image={data?.course?.image}
            income={data?.course?.incomeDescription}
          />
        </>
      )}
    >
      <Content
        longDescription={data?.course?.longDescription}
        sections={data?.course?.sections}
      />

      <Footer>
        <BuySectionWrapper />

        {!isBought ? (
          <BuySectionWrapper>
            {!data?.course?.isFree ? (
              <>
                <p>
                  Стоимость обучения: <span>{data?.course?.price}$</span>
                </p>
                <Button onClick={handleBuyCourse} type="primary">
                  Купить
                </Button>
              </>
            ) : (
              <Button onClick={handleBuyCourse} type="primary">
                Начать курс
              </Button>
            )}
          </BuySectionWrapper>
        ) : (
          <BuySectionWrapper>
            <Button type="primary">
              <Link to={`/course/${data?.course?.courseId}`}>Начать курс</Link>
            </Button>
          </BuySectionWrapper>
        )}
      </Footer>
    </PageContainer>
  );
};

export default CoursePresentation;
