import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 16px;
  line-height: 16px;
  font-weight: bold;
`;

const Additional = styled.div`
  display: flex;
  font-size: 12px;
`;

type Props = {
  id: string;
  title?: string | null;
  count?: number | string;
  type?: string;
};

const SectionItem = ({ title, count, type }: Props) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Additional>{`0/${count} | 23 мин`}</Additional>
    </Wrapper>
  );
};

export default SectionItem;
