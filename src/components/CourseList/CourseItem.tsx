import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { Course } from '../../graphql';

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
  border-radius: 5px;
`;

export const CourseContent = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

export const CourseDescription = styled.p`
  font-size: 16px;
  line-height: 24px;
`;

interface CourseItemProps extends Course {
  isAvailable?: boolean;
  onClick?: (id: string) => void;
}

const CourseItem = ({
  id,
  title,
  description,
  isAvailable,
  onClick
}: CourseItemProps) => {
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


          <Button type="primary">
            <Link
              onClick={
                !isAvailable && onClick
                  ? (e: React.MouseEvent) => {
                      e.preventDefault();
                      onClick(id);
                    }
                  : undefined
              }
              to={isAvailable ? `/course/${id}` : ''}
            >
              {isAvailable ? 'Начать курс' : 'Купить курс'}
            </Link>
          </Button>
        </CourseContent>
      </Wrapper>
    </WithPadding>
  );
};

export default CourseItem;
