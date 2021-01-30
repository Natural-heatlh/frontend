import React, {useCallback, useContext, useEffect, useMemo} from 'react';
import { useMutation, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { useHistory } from 'react-router';
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

const checkLecture = (lectureId: string, course: Course) => {
  let isTestLecture = false;
  course?.sections?.forEach((item) => {
    item?.children?.forEach((child) => {
      if (child?.type === 'Test' && child.lectureId === lectureId) {
        isTestLecture = true;
      }
    });
  });

  return isTestLecture;
};

const CoursePage = (props: any) => {
  const history = useHistory();
  const { id, lectureId } = props.match.params;

  const userContext = useContext(AuthContext);

  const { data, loading } = useQuery(query.CourseQuery, {
    variables: {
      id
    }
  });

  useEffect(() => {
    if(data?.course) {
      if(Number(userContext?.status) + 1 < Number(data?.course?.level)) {
        history.replace('/courses');
      }
    }
  }, [data, userContext, history]);

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
      const isTestLecture = checkLecture(lectureId, data?.course);

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
        item?.children?.find((child) => child?.lectureId === lectureId)
      );

      return activeSection?.sectionId || '';
    }
  }, [data, lectureId, loading]);

  const [prevLectureId, nextLectureId] = useMemo(() => {
    if (!loading && data?.course) {
      let prev, next;

      const activeSectionIndex = data.course?.sections.findIndex(
        (item: Section) =>
          item?.children?.find((child) => child?.lectureId === lectureId)
      );
      if (activeSectionIndex === data.course?.sections.length - 1) {
        next = null;
      }

      const activeSection = data.course?.sections?.find((item: Section) =>
        item?.children?.find((child) => child?.lectureId === lectureId)
      );

      const activeLectureIndex = activeSection?.children?.findIndex(
        (item: SectionChildren) => item?.lectureId === lectureId
      );
      if (activeLectureIndex === 0 && activeSectionIndex !== 0) {
        const prevSection = data.course?.sections[activeSectionIndex - 1];
        prev = prevSection.children[prevSection?.children.length - 1 || 0]?.lectureId;
      } else if (activeLectureIndex === 0 && activeSectionIndex === 0) {
        prev = data?.course?.sections[0]?.children[0]?.lectureId;
      } else {
        prev = activeSection?.children[activeLectureIndex - 1]?.lectureId;
      }

      if (activeLectureIndex === activeSection?.children.length - 1) {
        next = data.course?.sections[activeSectionIndex + 1]?.children[0]?.lectureId;
      } else {
        next = activeSection?.children[activeLectureIndex + 1]?.lectureId;
      }
      return [prev, next];
    }
    return [null, null];
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

  if(!lectureId && id && data?.course) {
    const firstLectureId = data?.course?.sections[0]?.children[0]?.lectureId;
    history.replace(`/course/${id}/lecture/${firstLectureId}`);
  }

  return (
    <StyledPageContainer pageTitle={data.course?.title} withTitleMargin={false}>
      <CourseWrapper>
        <CourseContent
          addProgress={addProgress}
          lectureId={lectureId}
          course={data.course}
          progress={progress as string[]}
          prevLectureId={prevLectureId}
          nextLectureId={nextLectureId}
          isCompletedTillTest={isCompletedTillTest}
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
