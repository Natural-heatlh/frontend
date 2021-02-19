import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import { Button, List } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { setCourses } from '../../slices/actions';
import Preloader from '../../components/Preloader';
import { Course } from '../../graphql';
import AdminContainer from './Container';
import query from './query.graphql';
import {
  AdminCoursesQuery,
  AdminCoursesQueryVariables,
} from './query.generated';

const Courses = () => {
  const location = useLocation();
  const { data, loading, error } = useQuery<
    AdminCoursesQuery,
    AdminCoursesQueryVariables
  >(query.AdminCourses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCourses(data?.adminCourses as Course[]));
  }, [data, dispatch]);

  // const [deleteOneCourse] = useMutation<
  //   DeleteCourseMutation,
  //   DeleteCourseMutationVariables
  // >(query.DeleteCourse);

  // const handleRemove = useCallback(
  //   async (id: string) => {
  //     await deleteOneCourse({
  //       variables: {
  //         id
  //       },
  //       refetchQueries: [
  //         {
  //           query: query.AdminCourses
  //         }
  //       ]
  //     });
  //   },
  //   [deleteOneCourse]
  // );

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
      {data?.adminCourses ? (
        <List
          itemLayout="horizontal"
          dataSource={data?.adminCourses}
          bordered
          renderItem={(item) => (
            <List.Item
              actions={[
                <Link to={`${location.pathname}/${item?.courseId}`}>
                  Редактировать
                </Link>
              ]}
            >
              <List.Item.Meta
                title={
                  <Link to={`/admin/courses/${item?.courseId}`}>
                    {item?.title}
                  </Link>
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
