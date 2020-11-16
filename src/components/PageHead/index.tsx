import React from 'react';
import styled from 'styled-components';
import Container from '../Container';

const Wrapper = styled.div`
  height: 90px;
  background: #ebf5f4;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 3px solid #e8e8e8;
  margin-bottom: 30px;
`;

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  font-size: 36px;
`;

type Props = {
  children: React.ReactNode;
};

const PageHead = ({ children }: Props) => {
  return (
    <Wrapper>
      <StyledContainer>{children}</StyledContainer>
    </Wrapper>
  );
};

export default PageHead;
