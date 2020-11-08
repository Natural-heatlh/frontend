import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Form, Input, Tabs } from 'antd';
import styled from 'styled-components';
import { Course as CourseState } from '../../graphql';
import query from './query.graphql';
import AdminContainer from './Container';

const { TabPane } = Tabs;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Course = (props: any) => {
  const { id } = props.match.params;
  const [state, setState] = useState<CourseState>();
  const { data, loading, error } = useQuery(query.Course, {
    variables: {
      id
    }
  });

  useEffect(() => {
    if (data && data.course) {
      setState(data?.course);
    }
  }, [data, loading]);

  if (loading) return <div>Loading ....</div>;
  if (error) return <div>Error</div>;

  return (
    <AdminContainer withSidebar>
      <Wrapper>
        <Form name="basic">
          <Form.Item
            label="Заговок курса"
            name="courseTitle"
            rules={[
              {
                message: 'Please input your username!'
              }
            ]}
            initialValue={state?.title}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Описание курса"
            name="courseDescription"
            rules={[
              {
                message: 'Please input your username!'
              }
            ]}
            initialValue={state?.description || ''}
          >
            <Input />
          </Form.Item>

          {state?.sections ? (
            <Tabs tabPosition="left">
              {state?.sections?.map((item) => (
                <TabPane tab={item?.title} key={item?.id}>
                  {item?.children?.map((child) => (
                    <div>{child?.title}</div>
                  ))}
                </TabPane>
              ))}
            </Tabs>
          ) : null}
          {}
        </Form>
      </Wrapper>
    </AdminContainer>
  );
};

export default Course;
