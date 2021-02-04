import React, { useCallback, useContext } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Modal } from 'antd';
import CourseList from '../../components/CourseList';
import PageContainer from '../../components/PageContainer';
import Preloader from '../../components/Preloader';
import { usePageTitle } from '../../hooks/usePageTitle';
import { AuthContext } from '../../components/Auth/AuthCheck';
import axios from '../../helpers/axios';
import query from './query.graphql';

const Courses = () => {
  usePageTitle('Список курсов');
  const { data, loading, error } = useQuery(query.CoursesQuery);
  const user = useContext(AuthContext);

  const [buyCourse] = useMutation(query.BuyCourse);
  const handleBuyCourse = useCallback(
    async (event: React.MouseEvent, id: string) => {
      const currentCourse = data?.courses?.find(
        (item: any) => item.courseId === id
      );
      if(!currentCourse?.isFree) {
        event.preventDefault();
      }

      if (currentCourse?.isFree) {
        try {
          await buyCourse({ variables: { id } });
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          await axios.post('/payment/buy-course', {
            userId: user?.id,
            partnerID: 'some_partner_id',
            price: 100
          });
        } catch (e) {
          console.log(e);
        }
      }
    },
    [buyCourse, user, data]
  );

  const availableCourses = user?.courses?.map<string>(
    (item) => item?.courseId as string
  );

  if (loading) return <Preloader />;
  if (error) {
    Modal.error({
      title: 'Ошибка',
      content: error.message
    });
  }

  return (
    <PageContainer pageTitle="Курсы">
      {data?.courses && data?.courses.length > 0 ? (
        <CourseList
          onClick={handleBuyCourse}
          courses={data?.courses}
          availableCourses={availableCourses}
        />
      ) : (
        'No data'
      )}
    </PageContainer>
  );
};

export default Courses;
