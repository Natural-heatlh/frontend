import { Button } from 'antd';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import query from './Add/query.graphql';

const StyledFixedDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 80px;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: #fff;
  box-shadow: 0 3px 5px 4px rgba(0, 0, 0, 0.03);
  z-index: 1000;
  padding: 0 50px;
`;

const Footer = () => {
  const course = useSelector((state: any) => state.course);
  const [createCourse] = useMutation(query.CreateCourse);
  const handleSave = useCallback(async () => {
    await createCourse({
      variables: {
        input: {
          ...course
        }
      }
    });
  }, [course, createCourse]);
  return (
    <StyledFixedDiv>
      <Button size="large" type="primary" onClick={handleSave}>
        Сохранить
      </Button>
    </StyledFixedDiv>
  );
};

export default Footer;
