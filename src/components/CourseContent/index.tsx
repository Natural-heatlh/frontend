import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Course, Test, Theory as TheoryType } from '../../graphql';
import Quiz from '../Quiz';
import { ContentType } from '../../types';
import { usePageTitle } from '../../hooks/usePageTitle';
import AboutCourse from './AboutCourse';
import Theory from './Theory';

const Wrapper = styled.div`
  width: calc(100% - 320px);
  height: 100%;
`;

type Props = {
  course?: Course;
  lectureId?: string;
  addProgress: () => void;
  progress?: string[];
  nextLectureId?: string | null;
};

const CourseContent = ({
  course,
  lectureId,
  progress,
  addProgress,
  nextLectureId
}: Props) => {
  const [currentLecture, setCurrentLecture] = useState<TheoryType | Test>({});

  usePageTitle(`${currentLecture.title} - ${course?.title}`);

  useEffect(() => {
    course?.sections?.forEach((item) => {
      const current = item?.children?.find((child) => child?.id === lectureId);
      if (current) {
        setCurrentLecture(current as any);
      }
    });
  }, [course, lectureId, setCurrentLecture]);

  const isCompleted = progress?.includes(currentLecture?.id as string);

  const next = nextLectureId
    ? `/course/${course?.id}/lecture/${nextLectureId}`
    : null;

  return (
    <Wrapper>
      {currentLecture?.type === ContentType.THEORY && (
        <Theory
          addProgress={addProgress}
          isCompleted={isCompleted}
          lecture={currentLecture as TheoryType}
          next={next}
        />
      )}
      {currentLecture.type === ContentType.TEST && (
        <Quiz
          courseId={course?.id}
          lecture={currentLecture as Test}
          addProgress={addProgress}
        />
      )}
      <AboutCourse description={course?.description} />
    </Wrapper>
  );
};

export default CourseContent;
