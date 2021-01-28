import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { Modal } from 'antd';
import {
  Course,
  Test,
  Theory as TheoryType,
  Video as VideoType
} from '../../graphql';
import Quiz from '../Quiz';
import { ContentType } from '../../types';
import { usePageTitle } from '../../hooks/usePageTitle';
import Video from '../Video';
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
  isCompletedTillTest?: boolean;
  prevLectureId?: string | null;
};

const CourseContent = ({
  course,
  lectureId,
  progress,
  addProgress,
  prevLectureId,
  nextLectureId,
  isCompletedTillTest
}: Props) => {
  const [currentLecture, setCurrentLecture] = useState<
    TheoryType | Test | VideoType
  >({});
  const [modalMessage, updateMessage] = useState('');
  const history = useHistory();

  usePageTitle(`${currentLecture.title} - ${course?.title}`);

  useEffect(() => {
    course?.sections?.forEach((item, index) => {
      const current = item?.children?.find(
        (child) => child?.lectureId === lectureId
      );
      if (!isCompletedTillTest && currentLecture.type === 'Test') {
        updateMessage('Пройдите курс полностью чтобы получить доступ к тесту!');
      }
      if (current) {
        setCurrentLecture(current as any);
      }
    });
  }, [
    course,
    lectureId,
    setCurrentLecture,
    isCompletedTillTest,
    currentLecture
  ]);

  const handleCancelModal = useCallback(() => {
    history.replace(`/course/${course?.courseId}/lecture/${prevLectureId}`);
    updateMessage('');
  }, [history, course, prevLectureId]);

  const isCompleted = progress?.includes(currentLecture?.lectureId as string);

  const next = nextLectureId
    ? `/course/${course?.courseId}/lecture/${nextLectureId}`
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
          courseId={course?.courseId}
          lecture={currentLecture as Test}
          addProgress={addProgress}
        />
      )}
      {currentLecture.type === ContentType.VIDEO && (
        <Video lecture={currentLecture as VideoType} />
      )}
      <AboutCourse description={course?.description} />
      {modalMessage ? (
        <Modal
          visible={!!modalMessage}
          onCancel={handleCancelModal}
          onOk={handleCancelModal}
        >
          {modalMessage}
        </Modal>
      ) : null}
    </Wrapper>
  );
};

export default CourseContent;
