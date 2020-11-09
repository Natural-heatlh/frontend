import React, { useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Button, List } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import AdminContainer from './Container';
import query from './query.graphql';
import {
  CoursesQuery,
  CoursesQueryVariables,
  DeleteCourseMutation,
  DeleteCourseMutationVariables
} from './query.generated';


const Courses = () => {
  const location = useLocation();
  const { data, loading, error } = useQuery<
    CoursesQuery,
    CoursesQueryVariables
  >(query.Courses);

  const [deleteOneCourse] = useMutation<
    DeleteCourseMutation,
    DeleteCourseMutationVariables
  >(query.DeleteCourse);

  const handleRemove = useCallback(
    async (id: string) => {
      await deleteOneCourse({
        variables: {
          id
        },
        optimisticResponse: {
          __typename: 'Mutation',
          deleteCourse: {
            __typename: 'Course',
            id: id
          }
        },
        update: (cache, result) => {
          const deleteCourse = result.data?.deleteCourse;
          const dataCourses = cache.readQuery<CoursesQuery>({
            query: query.Courses
          });

          if (deleteCourse) {
            cache.writeQuery({
              query: query.Courses,
              data: {
                ...dataCourses,
                courses: dataCourses?.courses.filter(
                  (item) => item?.id !== deleteCourse?.id
                )
              }
            });
          }
        }
      });
    },
    [deleteOneCourse]
  );

  if (loading) return <div>Loading...</div>;

  if (error) {
    return null;
  }

  return (
    <AdminContainer
      actions={
        <Button>
          <Link to={`/admin/add-course`}>Добавить курс</Link>
        </Button>
      }
    >
      {data?.courses ? (
        <List
          itemLayout="horizontal"
          dataSource={data?.courses}
          bordered
          renderItem={(item) => (
            <List.Item
              actions={[
                <Link to={`${location.pathname}/edit/${item?.id}`}>
                  Редактировать
                </Link>,
                <a onClick={() => item?.id && handleRemove(item.id)}>Удалить</a>
              ]}
            >
              <List.Item.Meta
                title={
                  <Link to={`/admin/courses/${item?.id}`}>{item?.title}</Link>
                }
                description={item?.description}
              />
            </List.Item>
          )}
        />
      ) : null}
    </AdminContainer>
  );
};

export default Courses;
