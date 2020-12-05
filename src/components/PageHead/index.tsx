import React from 'react';
import styled from 'styled-components';
import Container from '../Container';

const Wrapper = styled.div<{ withTitleMargin?: boolean }>`
  height: 90px;
  background: #ebf5f4;
  width: 100%;
  display: flex;
  align-items: center;

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

type Props = {
  children: React.ReactNode;
  withTitleMargin?: boolean;
};

const PageHead = ({ children, withTitleMargin }: Props) => {
  return (
    <Wrapper withTitleMargin={withTitleMargin}>
      <StyledContainer>{children}</StyledContainer>
    </Wrapper>
  );
};

export default PageHead;
