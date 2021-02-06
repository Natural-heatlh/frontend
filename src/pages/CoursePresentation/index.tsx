import React, { useCallback, useContext } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Button } from 'antd';
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

  const { data, loading, error } = useQuery(query.Course, {
    variables: {
      id
    }
  });

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
  }, [user, data]);

  usePageTitle(data?.course?.title);

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
        <BuySectionWrapper>
          <p>
            Стоимость обучения: <span>{data?.course?.price}$</span>
          </p>
          <Button onClick={handleBuyCourse} type="primary">
            Купить
          </Button>
        </BuySectionWrapper>
      </Footer>
    </PageContainer>
  );
};

export default CoursePresentation;









const object = {
  id: '27b0e879-000f-5000-9000-14474fac7835',
status: 'succeeded',
paid: true,
amount: { value: '100.00', currency: 'RUB' },
  authorization_details: { rrn: '143068937591', auth_code: '934912' },
  captured_at: '2021-02-06T17:41:41.588Z',
created_at: '2021-02-06T17:41:13.657Z',
description: 'Заказ курса - Business Leader от nh.course@yandex.ru',
income_amount: { value: '96.50', currency: 'RUB' },
  metadata: {
  courseName: 'Business Leader',
  partnerId: '',
  courseId: 'course-90f777ec-f333-40f6-989b-8bbb214e6503',
  email: 'nh.course@yandex.ru'
  },
  payment_method: {
  type: 'bank_card',
  id: '27b0e879-000f-5000-9000-14474fac7835',
  saved: false,
  card: {
    first6: '555555',
    last4: '4444',
    expiry_month: '07',
    expiry_year: '2029',
    card_type: 'MasterCard',
    issuer_country: 'US'
    },
  title: 'Bank card *4444'
  },
  recipient: { account_id: '782345', gateway_id: '1820329' },
  refundable: true,
refunded_amount: { value: '0.00', currency: 'RUB' },
  test: true
  }
