import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Form, Input, Tabs } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../slices/actions';
import { State } from '../../types/state';
import { Course as CourseType } from '../../graphql';
import AdminContainer from './Container';
import query from './query.graphql';

const { TabPane } = Tabs;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Course = (props: any) => {
  const { id } = props.match.params;
  const { data, loading, error } = useQuery(query.Course, {
    variables: {
      id
    }
  });


  const dispatch = useDispatch();
  useEffect(() => {
    if (data && data.course) {
      dispatch(setCourse(data?.course));
    }
  }, [data, loading, dispatch]);

  const course = useSelector<State, CourseType>((state) => state.course);

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
            initialValue={course?.title}
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
            initialValue={course?.description || ''}
          >
            <Input />
          </Form.Item>

          {course?.sections ? (
            <Tabs tabPosition="left">
              {course?.sections?.map((item) => (
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
