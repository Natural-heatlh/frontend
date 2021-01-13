import React, { useCallback, useContext, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import styled from 'styled-components';
import CourseNavigation from '../../components/CourseNavigation';
import Preloader from '../../components/Preloader';
import PageContainer from '../../components/PageContainer';
import CourseContent from '../../components/CourseContent';
import { AuthContext } from '../../components/Auth/AuthCheck';
import { Course, Section, SectionChildren } from '../../graphql';
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

  console.log(lectureId);

  const { data, loading } = useQuery(query.CourseQuery, {
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
  }, [data, id, userContext, loading]);

  const addProgress = useCallback(() => {
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
  }, [lectureId, id, data, loading, addToProgress]);

  const activeSectionKey = useMemo(() => {
    if (!loading && data.course) {
      const activeSection = data.course?.sections?.find((item: Section) =>
        item?.children?.find((child) => child?.id === lectureId)
      );

      return activeSection?.id || '';
    }
  }, [data, lectureId, loading]);

  const nextLectureId = useMemo(() => {
    if (!loading && data?.course) {
      const activeSectionIndex = data.course?.sections.findIndex(
        (item: Section) =>
          item?.children?.find((child) => child?.id === lectureId)
      );
      if (activeSectionIndex === data.course?.sections.length - 1) return null;

      const activeSection = data.course?.sections?.find((item: Section) =>
        item?.children?.find((child) => child?.id === lectureId)
      );

      const activeLectureIndex = activeSection.children.findIndex(
        (item: SectionChildren) => item?.id === lectureId
      );

      if (activeLectureIndex === activeSection?.children.length - 1) {
        return data.course?.sections[activeSectionIndex + 1]?.children[0]?.id;
      } else {
        return activeSection.children[activeLectureIndex + 1]?.id;
      }
    }
    return null;
  }, [data, lectureId, loading]);

  const isCompletedTillTest = useMemo(() => {
    const flattenedCourse =
      data?.course?.sections
        ?.reduce((acc: Array<any>, item: any) => {
          return [...acc, ...item?.children];
        }, [])
        .filter((item: any) => item.type !== 'Test') || [];

    return (
      progress?.length === flattenedCourse.length ||
      progress?.length === flattenedCourse.length + 1
    );
  }, [data, progress]);

  if (loading) return <Preloader />;

  return (
    <StyledPageContainer pageTitle={data.course?.title} withTitleMargin={false}>
      <CourseWrapper>
        <CourseContent
          addProgress={addProgress}
          lectureId={lectureId}
          course={data.course}
          progress={progress as string[]}
          nextLectureId={nextLectureId}
        />
        <CourseNavigation
          courseUrl={!lectureId ? props.match.url : `/course/${id}`}
          sections={data.course?.sections}
          activeSectionKey={activeSectionKey}
          // TODO fix ts
          progress={progress as string[]}
          isCompletedTillTest={isCompletedTillTest}
        />
      </CourseWrapper>
    </StyledPageContainer>
  );
};

export default CoursePage;
