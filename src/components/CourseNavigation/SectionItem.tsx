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
  index?: number;
};

const getSectionShortDescription = (count: number) => {
  if(count === 1) {
    return 'урок';
  }
  if(count > 1 && count <= 4) {
    return 'урока'
  }
  return 'уроков';
}

const SectionItem = ({ title, count, index }: Props) => {
  return (
    <Wrapper>
      <Title>Раздел {index}: {title}</Title>
      <Additional>{`В разделе ${count} ${getSectionShortDescription(Number(count))}`}</Additional>
    </Wrapper>
  );
};

export default SectionItem;
