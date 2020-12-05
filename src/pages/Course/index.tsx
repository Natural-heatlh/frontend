import React, { useContext, useEffect, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import styled from 'styled-components';
import CourseNavigation from '../../components/CourseNavigation';
import Preloader from '../../components/Preloader';
import PageContainer from '../../components/PageContainer';
import CourseContent from '../../components/CourseContent';
import { AuthContext } from '../../components/Auth/AuthCheck';
import { Course } from '../../graphql';
import query from './query.graphql';


const CourseWrapper = styled.div`
  display: flex;
`;

const StyledPageContainer = styled(PageContainer)`
  background: #fff;
`;

const checkLecture = (id: string, course: Course) => {
  let isTestLecture = false;
  course?.sections?.forEach((item) => {
    item?.children?.forEach((child) => {
      if (child?.type === 'Theory' && child.id === id) {
        isTestLecture = true;
      }
    });
  });

  return isTestLecture;
};

const CoursePage = (props: any) => {
  const { id, lectureId } = props.match.params;
  const userContext = useContext(AuthContext);

  const { data, loading, error } = useQuery(query.CourseQuery, {
    variables: {
      id
    }
  });

  const [addToProgress] = useMutation(query.AddToProgress);

  const progress = useMemo(() => {
    if (!loading && data?.course) {
      const currentUserCourse = userContext?.courses?.find(
        (item) => item?.courseId === id
      );
      return currentUserCourse?.progress || [];
    }
  }, [data, id, lectureId, userContext]);

  useEffect(() => {
    if (!loading && data?.course) {
      const isTestLecture = checkLecture(id, data?.course);

      if (id && lectureId && !isTestLecture) {
        addToProgress({
          variables: {
            id: lectureId,
            courseId: id
          }
        });
      }
    }
  }, [lectureId, id, data, loading]);

  if (loading) return <Preloader />;

  return (
    <StyledPageContainer pageTitle={data.course.title} withTitleMargin={false}>
      <CourseWrapper>
        <CourseContent lectureId={lectureId} course={data.course} />
        <CourseNavigation
          courseUrl={!lectureId ? props.match.url : `/course/${id}`}
          sections={data.course?.sections}
          // TODO fix ts
          progress={progress as string[]}
        />
      </CourseWrapper>
    </StyledPageContainer>
  );
};

export default CoursePage;
