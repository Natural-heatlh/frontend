import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import {
  CourseContent,
  CourseDescription,
  CourseHead,
  CourseTitle,
  WithPadding,
  Wrapper
} from '../CourseList/CourseItem';
import { Course, SectionChildren, UserCourse } from '../../graphql';
import { AuthContext } from '../Auth/AuthCheck';

export const ProgressBar = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Bar = styled.div`
  position: relative;
  height: 3px;
  background: #e8e8e8;
  margin-bottom: 10px;
`;

const InsideBar = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0;
  background-color: #007d75;
  transition: width 0.8s ease;
`;

const ProgressBarText = styled.span`
  font-size: 12px;
  line-height: 24px;
  color: #999999;
`;

const getProgressInPercent = (
  userCourse?: UserCourse | null,
  flattenCourse?: SectionChildren[]
) => {
  if (userCourse && userCourse.progress && flattenCourse) {
    const percent = userCourse?.progress?.length / flattenCourse.length;
    return Math.round(percent * 100);
  }
  return 0;
};

export const UserCourseItem = ({
  id,
  title,
  description,
  sections
}: Course) => {
  const userContext = useContext(AuthContext);
  const flattenCourse = useMemo(() => {
    // TODO fix type
    return sections?.reduce((acc: Array<any>, item) => {
      return [...acc, ...item?.children];
    }, []);
  }, [sections]);

  const userCourse = useMemo(() => {
    return userContext?.courses?.find((item) => item?.courseId === id);
  }, [userContext, id]);

  const percent = getProgressInPercent(userCourse, flattenCourse);

  return (
    <WithPadding>
      <Wrapper>
        <CourseHead
          style={{
            background: `url(https://i.pinimg.com/originals/b9/17/1b/b9171b877a6721ffc9db17bfe2d6a482.png)`
          }}
        />
        <CourseContent>
          <CourseTitle>{title}</CourseTitle>
          <CourseDescription>{description}</CourseDescription>

          <ProgressBar>
            <Bar>
              <InsideBar
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
              />
            </Bar>
            <ProgressBarText>Завершено на {percent}%</ProgressBarText>
          </ProgressBar>
          <Button type="primary">
            <Link to={`/course/${id}`}>Начать курс</Link>
          </Button>
        </CourseContent>
      </Wrapper>
    </WithPadding>
  );
};

export default UserCourseItem;
