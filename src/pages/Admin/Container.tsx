import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import Wrapper from '../../components/Admin/Wrapper';

const { Content, Sider } = Layout;

const StyledSidebar = styled(Sider)`
  background: transparent;
  display: flex;
  justify-content: center;
`;

type Props = {
  children?: React.ReactNode;
  withSidebar?: boolean;
  actions?: React.ReactNode;
};

const AdminContainer = (props: Props) => {
  return (
    <Layout>
      <Wrapper>
        {/*<Breadcrumbs />*/}
        <Layout
          className="site-layout-background"
          style={{ padding: '24px 0' }}
        >
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {props.children}
          </Content>
          <StyledSidebar width={200}>
            {props.actions}
          </StyledSidebar>
        </Layout>
      </Wrapper>
    </Layout>
  );
};

export default AdminContainer;
