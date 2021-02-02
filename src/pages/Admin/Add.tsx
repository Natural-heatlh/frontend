import React, { useCallback, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Form, Modal } from 'antd';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import MainForm from '../../components/Admin/Main/MainForm';
import { usePageTitle } from '../../hooks/usePageTitle';
import { State } from '../../types';
import { setCourse } from '../../slices/actions';
import { CreateCourseInput } from '../../graphql';
import AdminContainer from './Container';
import query from './query.graphql';
import {
  CreateCourseMutation,
  CreateCourseMutationVariables
} from './query.generated';

const initialState = {
  courseId: `course-${uuid()}`,
  description: '',
  image: undefined,
  title: '',
  isFree: false,
  isPublished: false
};
const Add = () => {
  usePageTitle('Добавить курс');
  const [form] = Form.useForm();
  const course = useSelector((state: State) => state.course);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(
      setCourse({
        ...initialState,
        sections: []
      })
    );
  }, [dispatch]);

  const [createCourse] = useMutation<
    CreateCourseMutation,
    CreateCourseMutationVariables
  >(query.CreateCourse);

  const handleSave = useCallback(async () => {
    const result = await createCourse({
      variables: {
        input: {
          ...(course as CreateCourseInput)
        }
      },
      refetchQueries: [
        {
          query: query.AdminCourses
        }
      ]
    });

    if (result?.data?.createCourse) {
      Modal.success({
        title: 'Вы успешно добавили курс',
        content: 'Для продолжения редактирование нажмите Ок',
        onOk: () => {
          history.replace(
            `/admin/courses/${result?.data?.createCourse?.courseId}`
          );
        },
        onCancel: () => {
          history.replace('/admin/courses');
        }
      });
    }
  }, [course, createCourse, history]);

  return (
    <AdminContainer>
      <MainForm handleSave={handleSave} course={course} form={form} />
    </AdminContainer>
  );
};

export default Add;
