import React, { useContext } from 'react';
import styled from 'styled-components';
import { Button, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { Course } from '../../graphql';
import { ReactComponent as CoinIcon } from '../../static/coins.svg';
import { AuthContext } from '../Auth/AuthCheck';

export const CourseHead = styled.div`
  height: 250px;
  background-size: cover !important;
  background-position: center center !important;
  overflow: hidden;
  border-radius: 5px 5px 0 0;
`;

export const CourseTitle = styled.h3`
  font-size: 24px;
  line-height: 31px;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const WithPadding = styled.div`
  width: calc(100% / 3);
  padding: 12px;
  &:first-child {
    padding-left: 0;
  }
  &:nth-child(3n) {
    padding-right: 0;
  }
`;

export const Wrapper = styled.div`
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  background: #ffffff;
  height: 100%;
  border-radius: 5px;
  position: relative;
`;

const Overlay = styled(Tooltip)`
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  position: absolute;
  cursor: pointer;
  border-radius: 5px;
`;

export const CourseContent = styled.div`
  position: relative;
  padding: 30px 30px 100px 30px;
  height: calc(100% - 250px);
  display: flex;
  position: relative;
  flex-direction: column;
`;

const StyledButton = styled(Button)`
  position: absolute;
  left: 50%;
  width: calc(100% - 60px);
  transform: translateX(-50%);
  bottom: 30px;
`;

export const CourseDescription = styled.p`
  font-size: 16px;
  line-height: 24px;
`;

const IncomeDescription = styled.span`
  position: absolute;
  left: 30px;
  bottom: 85px;
  font-size: 12px;
  line-height: 22px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #8c8c8c;
`;

const StyledCoinIcon = styled(CoinIcon)`
  margin-right: 8px;
`;

const checkCourseAvailable = (
  isPublished: boolean,
  userStatus: number,
  courseStatus: number
) => {
  if (!isPublished) {
    return [false, 'Курс ещё не опубликован'];
  }

  if (Number(userStatus) === 0 && Number(courseStatus) !== 0) {
    return [
      false,
      'Для перехода к данному курсу Вам необходимо стать партнером!'
    ];
  }

  if (Number(courseStatus) > Number(userStatus) + 1) {
    return [false, 'Пройдите предыдущие курсы для перехода'];
  }

  return [true, 'Для перехода к курсу нажмите купить'];
};

const getButtonText = (
  isPublished?: boolean | null,
  isFree?: boolean | null,
  isAvailable?: boolean | null,
  courseId?: string
) => {
  if (isFree) {
    return ['Начать курс', `/presentation/${courseId}`];
  } else {
    if (isAvailable) {
      return ['Начать курс', `/course/${courseId}`];
    }
    return ['Купить курс', `/presentation/${courseId}`];
  }
};

interface CourseItemProps extends Course {
  isAvailable?: boolean;
  onClick?: (e: React.MouseEvent, id: string) => void;
}

const CourseItem = ({
  courseId,
  title,
  description,
  isAvailable,
  incomeDescription,
  image,
  isFree,
  isPublished,
  level
}: CourseItemProps) => {
  const userContext = useContext(AuthContext);
  const [buttonText, buttonLink] = getButtonText(
    isPublished,
    isFree,
    isAvailable,
    courseId
  );

  const [isAccessible, tooltipText] = checkCourseAvailable(
    isPublished as boolean,
    userContext?.status as number,
    level as number
  );

  return (
    <WithPadding>
      <Wrapper>
        <CourseHead
          style={{
            background: `url(${image})`
          }}
        />
        <CourseContent>
          <CourseTitle>{title}</CourseTitle>
          <CourseDescription>{description}</CourseDescription>

          <IncomeDescription>
            <StyledCoinIcon />
            {incomeDescription}
          </IncomeDescription>

          <StyledButton type="primary">
            <Link to={buttonLink}>{buttonText}</Link>
          </StyledButton>
        </CourseContent>
        {!isAccessible ? (
          <Overlay placement="right" title={tooltipText} />
        ) : null}
      </Wrapper>
    </WithPadding>
  );
};

export default CourseItem;
