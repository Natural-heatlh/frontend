import React from 'react';
import styled from 'styled-components';

const Table = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 13%;
  padding-right: 13%;
`;

const TableHead = styled.div`
  font-size: 24px;
  line-height: 31px;
  padding: 30px;
  font-weight: bold;
`;

const Tr = styled.div`
  display: flex;
  border-bottom: 1px solid #dedfe0;

  &:last-child {
    border-botton: none;
  }
`;

const Td = styled.div`
  padding: 30px;
  font-size: 16px;
  line-height: 24px;
`;

const FirstCell = styled(Td)`
  max-width: 200px;
  width: 100%;
`;

const SecondCell = styled(Td)`
  width: calc(100% - 200px);
`;

type Props = {
  description?: string | null;
};

const AboutCourse = ({ description }: Props) => {
  return (
    <Table>
      <TableHead>Об этом курсе</TableHead>
      <Tr>
        <FirstCell>Описание</FirstCell>
        <SecondCell>{description}</SecondCell>
      </Tr>
    </Table>
  );
};

export default AboutCourse;
