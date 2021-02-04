import React, { useCallback, useEffect } from 'react';
import { Modal } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import { setCourse } from '../../slices/actions';
import MainForm from '../../components/Admin/Main/MainForm';
import Preloader from '../../components/Preloader';
import { State } from '../../types';
import AdminContainer from './Container';
import query from './query.graphql';
import { AdminCourseQuery, AdminCourseQueryVariables } from './query.generated';
import { initialState } from './Add';

const Edit = (props: any) => {
  const dispatch = useDispatch();
  const [form] = useForm();
  const course = useSelector((state: State) => state.course);

  const { id } = props.match.params;
  const { data, loading, error } = useQuery<
    AdminCourseQuery,
    AdminCourseQueryVariables
  >(query.AdminCourse, {
    variables: {
      id
    }
  });

  const [updateCourse] = useMutation(query.UpdateCourse);

  const handleUpdate = useCallback(async () => {
    const { courseId, ...rest } = course;

    try {
      const result = await updateCourse({
        variables: {
          id: course.courseId,
          input: {
            ...rest
          }
        },
        refetchQueries: [
          {
            query: query.AdminCourses
          }
        ]
      });

      if (result.data?.updateCourse) {
        Modal.success({
          title: 'Вы успешно обновили курс!',
          content: 'Поздравляем с успешным обновлением курса!.'
        });
      }
    } catch (e) {
      if (e.graphQLErrors.length > 0) {
        Modal.error({
          title: 'Ошибка обновления!',
          content: e.graphQLErrors[0]?.message
        });
      }
    }
  }, [course, updateCourse]);

  useEffect(() => {
    if (data && data?.adminCourse) {
      dispatch(setCourse(data?.adminCourse));

      form.setFieldsValue({ ...data?.adminCourse });
    }
    return () => {
      form.resetFields();
      dispatch(setCourse(initialState));
    };
  }, [data, loading, dispatch, form]);

  if (loading) return <Preloader />;
  if (error) return <div>Error</div>;

  return (
    <AdminContainer>
      <MainForm handleSave={handleUpdate} course={course} form={form} />
    </AdminContainer>
  );
};

export default Edit;
