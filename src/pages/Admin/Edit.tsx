import React, { useCallback, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import { setCourse } from '../../slices/actions';
import MainForm from '../../components/Admin/Main/MainForm';
import Preloader from '../../components/Preloader';
import { State } from '../../types';
import AdminContainer from './Container';
import query from './query.graphql';

const Edit = (props: any) => {
  const dispatch = useDispatch();
  const [form] = useForm();
  const course = useSelector((state: State) => state.course);

  const { id } = props.match.params;
  const { data, loading, error } = useQuery(query.Course, {
    variables: {
      id
    }
  });

  const [updateCourse] = useMutation(query.UpdateCourse);

  const handleUpdate = useCallback(async () => {
    const { courseId, ...rest } = course;

    await updateCourse({
      variables: {
        id: course.courseId,
        input: {
          ...rest
        },
      },
      refetchQueries: [
        {
          query: query.Courses,
        }
      ],
    });
  }, [course, updateCourse]);

  useEffect(() => {
    if (data && data.course) {
      dispatch(setCourse(data?.course));

      form.setFieldsValue({ ...data?.course });
    }
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
