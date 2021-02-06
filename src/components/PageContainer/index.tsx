import React, { Fragment } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import PageHead, { PageHeadProps } from '../../components/PageHead';
import Container from '../Container';

type Props = {
  pageTitle?: string;
  children?: React.ReactNode;
  PageHeadContainer?: React.FC<PageHeadProps>;
  className?: string;
  withTitleMargin?: boolean;
  headColor?: string;
};

const Content = styled.div`
  width: 100%;
`;

const PageContainer = ({
  pageTitle,
  children,
  className,
  PageHeadContainer = PageHead,
  withTitleMargin = true,
  headColor = '#ebf5f4',
  ...otherProps
}: Props) => {
  return (
    <Fragment>
      <Header {...otherProps} />
      <PageHeadContainer color={headColor} withTitleMargin={withTitleMargin}>
        {pageTitle}
      </PageHeadContainer>
      <Content className={className}>
        <Container>{children}</Container>
      </Content>
    </Fragment>
  );
};

export default PageContainer;
