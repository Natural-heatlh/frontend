import React from 'react';
import { Breadcrumb } from 'antd';
import styled from 'styled-components';

const StyledBreadcrumbs = styled(Breadcrumb)`
  display: flex;
  justify-content: flex-start;
`;

const Breadcrumbs = () => {
  return (
    <StyledBreadcrumbs style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>List</Breadcrumb.Item>
      <Breadcrumb.Item>App</Breadcrumb.Item>
    </StyledBreadcrumbs>
    )
};

export default Breadcrumbs;
