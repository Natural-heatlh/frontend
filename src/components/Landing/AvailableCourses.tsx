import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CoinIcon } from '../../static/coins.svg';

const AvailableCourseWrapper = styled.div`
  padding: 12px 12px 25px 12px;
  box-sizing: border-box;
  max-width: calc(100% / 3);

  @media (max-width: 992px) {
    max-width: calc(100% / 2);
  }

  @media (max-width: 768px) {
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
  }
`;

const AppContent = styled.div`
  padding: 8px 24px 40px 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 6px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-width: 0;
  background: #fff;
  height: 100%;
`;

const CourseTitle = styled.h4`
  font-size: 24px;
  line-height: 31px;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 24px;
`;

const IncomeDescription = styled.span`
  position: absolute;
  left: 24px;
  bottom: 20px;
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

const CourseImageWrapper = styled.div`
  height: 270px;
  > * {
    width: 100%;
  }
`;

type Props = {
  image?: string | null;
  title?: string | null;
  description?: string | null;
  income?: string | null;
};

const AvailableCourse = ({ image, title, description, income }: Props) => {
  return (
    <AvailableCourseWrapper>
      <AppContent>
        <CourseImageWrapper>
          <img src={image as string} alt="title" />
        </CourseImageWrapper>
        <CourseTitle>{title}</CourseTitle>
        <Description>{description}</Description>

        <IncomeDescription>
          <StyledCoinIcon />
          {income}
        </IncomeDescription>
      </AppContent>
    </AvailableCourseWrapper>
  );
};

export default AvailableCourse;
