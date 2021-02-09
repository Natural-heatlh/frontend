import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Button, Modal } from 'antd';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import { usePageTitle } from '../../hooks/usePageTitle';
import Preloader from '../../components/Preloader';
import axios from '../../helpers/axios';
import { AuthContext } from '../../components/Auth/AuthCheck';
import {
  checkCourseAvailable,
  CheckProps,
  getAvailableOfPrev
} from '../../utils/checkCourseAvailable';
import { UserCourse } from '../../graphql';
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
  const history = useHistory();
  const user = useContext(AuthContext);

  const { data, loading } = useQuery(query.PresentationCourse, {
    variables: {
      id
    }
  });

  useEffect(() => {
    if (data?.presentationCourse) {
      const options: CheckProps = {
        isPublished: data?.presentationCourse?.isPublished as boolean,
        userStatus: user?.status as number,
        courseStatus: data?.presentationCourse?.level as number,
        isAvailableOfPrev: getAvailableOfPrev(
          user?.courses as UserCourse[],
          data?.presentationCourse?.level as number
        )
      };

      const [isAccessible, message] = checkCourseAvailable(options);

      if (!isAccessible) {
        Modal.warning({
          title: 'Ошибка доступа!',
          content: message,
          onOk: () => history.replace('/courses')
        });
      }
    }
  }, [data, user, history]);

  usePageTitle(data?.presentationCourse?.title);

  const handleBuyCourse = useCallback(async () => {
    if (data?.presentationCourse) {
      try {
        const result = await axios.post('/payment/buy-course', {
          courseId: id,
          courseName: data.course?.title,
          email: user?.email,
          partnerID: user?.partnerID,
          price: data?.presentationCourse?.price || 30
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
        (item) => item?.courseId === data?.presentationCourse?.courseId
      );
    }
    return false;
  }, [data, user]);

  if (loading) return <Preloader />;

  return (
    <PageContainer
      pageTitle={data?.presentationCourse?.title}
      PageHeadContainer={(props) => (
        <>
          <PresentationPageHead
            {...props}
            description={data?.presentationCourse?.description}
            image={data?.presentationCourse?.image}
            income={data?.presentationCourse?.incomeDescription}
          />
        </>
      )}
    >
      <Content
        longDescription={data?.presentationCourse?.longDescription}
        sections={data?.presentationCourse?.sections}
      />

      <Footer>
        <BuySectionWrapper />

        {!isBought ? (
          <BuySectionWrapper>
            {!data?.presentationCourse?.isFree ? (
              <>
                <p>
                  Стоимость обучения:{' '}
                  <span>{data?.presentationCourse?.price}$</span>
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
              <Link to={`/course/${data?.presentationCourse?.courseId}`}>
                Начать курс
              </Link>
            </Button>
          </BuySectionWrapper>
        )}
      </Footer>
    </PageContainer>
  );
};

export default CoursePresentation;
