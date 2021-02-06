import React from 'react';
import styled from 'styled-components';
import Container from '../Container';

const Wrapper = styled.div<{ withTitleMargin?: boolean }>`
  height: 90px;
  width: 100%;
  display: flex;
  align-items: center;

  ${(props) =>
    props.color &&
    `
    background: ${props.color};
  `}

  ${(props) =>
    props.withTitleMargin &&
    `margin-bottom: 30px;
    border-bottom: 3px solid #e8e8e8;
    `}
`;

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  font-size: 36px;
`;

export type PageHeadProps = {
  children: React.ReactNode;
  withTitleMargin?: boolean;
  color?: string;
};

const PageHead = ({ children, withTitleMargin, color }: PageHeadProps) => {
  return (
    <Wrapper color={color} withTitleMargin={withTitleMargin}>
      <StyledContainer>{children}</StyledContainer>
    </Wrapper>
  );
};

export default PageHead;
