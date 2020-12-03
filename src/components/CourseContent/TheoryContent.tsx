import React from 'react';
import styled from 'styled-components';

const TheoryWrapper = styled.div`
  height: 400px;
  width: 100%;
  padding: 20px;
`;

type Props = {
  children?: React.ReactNode;
};

const TheoryContent = ({ children }: Props) => {
  return <TheoryWrapper>{children}</TheoryWrapper>;
};

export default TheoryContent;
