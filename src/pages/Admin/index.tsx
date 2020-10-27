import React from 'react';
import { Button, DatePicker, version } from 'antd';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Admin = () => {
  return (
    <div style={{ paddingTop: 30 }}>
      <h1>antd version: {version}</h1>
      <DatePicker/>
      <Button type="primary" style={{ marginLeft: 8 }}>
        Primary Button
      </Button>
      <Title>Hello world</Title>
    </div>
  )
};

export default Admin;
