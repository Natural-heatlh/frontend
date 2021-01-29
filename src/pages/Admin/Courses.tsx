import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { Button, List } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { setCourses } from '../../slices/actions';
import Preloader from '../../components/Preloader';
import { Course } from '../../graphql';
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCourses(data?.courses as Course[]));
  }, [data, dispatch]);

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
        refetchQueries: [
          {
            query: query.Courses
          }
        ],
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
                  (item) => item?.courseId !== deleteCourse?.courseId
                )
              }
            });
          }
        }
      });
    },
    [deleteOneCourse]
  );

  if (loading) return <Preloader />;

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
                <Link to={`${location.pathname}/${item?.courseId}`}>
                  Редактировать
                </Link>,
                <span onClick={() => item?.courseId && handleRemove(item.courseId)}>
                  Удалить
                </span>
              ]}
            >
              <List.Item.Meta
                title={
                  <Link to={`/admin/courses/${item?.courseId}`}>{item?.title}</Link>
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
