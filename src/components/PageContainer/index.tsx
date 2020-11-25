import React, { Fragment } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import PageHead from '../../components/PageHead';
import Container from '../Container';

type Props = {
  pageTitle?: string;
  children?: React.ReactNode;
  className?: string;
  withTitleMargin?: boolean;
};

const Content = styled.div`
  width: 100%;
`;

const PageContainer = ({
  pageTitle,
  children,
  className,
  withTitleMargin = true,
  ...otherProps
}: Props) => {
  return (
    <Fragment>
      <Header {...otherProps} />
      <PageHead withTitleMargin={withTitleMargin}>{pageTitle}</PageHead>
      <Content className={className}>
        <Container>{children}</Container>
      </Content>
    </Fragment>
  );
};

export default PageContainer;
