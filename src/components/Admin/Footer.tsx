import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

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

type Props = {
  save: () => void;
};

const Footer = ({ save }: Props) => {
  return (
    <StyledFixedDiv>
      <Button size="large" type="primary" onClick={save}>
        Сохранить
      </Button>
    </StyledFixedDiv>
  );
};

export default Footer;
