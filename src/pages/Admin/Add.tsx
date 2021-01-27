import React, { useCallback, useEffect } from 'react';
import { Form } from 'antd';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import MainForm from '../../components/Admin/Main/MainForm';
import { usePageTitle } from '../../hooks/usePageTitle';
import { State } from '../../types';
import { setCourse } from '../../slices/actions';
import AdminContainer from './Container';
import query from './query.graphql';

const initialState = {
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
  }, []);

  const [createCourse] = useMutation(query.CreateCourse);

  const handleSave = useCallback(async () => {
    const result = await createCourse({
      variables: {
        input: {
          ...course
        }
      },
      refetchQueries: [
        {
          query: query.Courses
        }
      ]
    });

    if (result?.data?.createCourse) {
      history.replace(`/admin/courses/${result?.data?.createCourse?.id}`);
    }
  }, [course, createCourse]);

  return (
    <AdminContainer>
      <MainForm handleSave={handleSave} course={course} form={form} />
    </AdminContainer>
  );
};

export default Add;
