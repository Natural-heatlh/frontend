import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

const PreloaderWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Preloader = () => {
  return (
    <PreloaderWrapper>
      <Spin size="large" />
    </PreloaderWrapper>
  );
};

export default Preloader;
