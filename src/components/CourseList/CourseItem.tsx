import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const CourseHead = styled.div`
  height: 250px;
  background-size: cover !important;
  background-position: center center !important;
  overflow: hidden;
  border-radius: 5px 5px 0 0;
`;

const CourseTitle = styled.h3`
  font-size: 24px;
  line-height: 31px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const WithPadding = styled.div`
  padding: 12px;
  &:first-child {
    padding-left: 0;
  }
  &:nth-child(3n) {
    padding-right: 0;
  }
`;

const ProgressBar = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Bar = styled.div`
  height: 3px;
  background: #e8e8e8;
  margin-bottom: 10px;
`;

const ProgressBarText = styled.span`
  font-size: 12px;
  line-height: 24px;
  color: #999999;
`;

const Wrapper = styled.div`
  width: calc(100% / 3);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 5px;

  &:first-child {
    width: calc(100% / 3 - 12px);
  }
`;

const CourseContent = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

const CourseDescription = styled.p`
  font-size: 16px;
  line-height: 24px;
`;

const CourseItem = () => {
  return (
    <WithPadding>
      <Wrapper>
        <CourseHead
          style={{
            background: `url(https://i.pinimg.com/originals/b9/17/1b/b9171b877a6721ffc9db17bfe2d6a482.png)`
          }}
        />

        <CourseContent>
          <CourseTitle>Бизнес лидер</CourseTitle>
          <CourseDescription>
            Вы получите всё, что хотите, если поможете достаточному количеству
            других людей получить то, что они хотят.
          </CourseDescription>
          <ProgressBar>
            <Bar />
            <ProgressBarText>Завершено на 0%</ProgressBarText>
          </ProgressBar>
          <Button type="primary">Начать курс</Button>
        </CourseContent>
      </Wrapper>
    </WithPadding>
  );
};

export default CourseItem;
