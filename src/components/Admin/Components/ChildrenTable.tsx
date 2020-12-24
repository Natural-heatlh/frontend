import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Space } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const { Column } = Table;

const columns = [
  {
    title: 'Заголовок',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Тип',
    dataIndex: 'type',
    key: 'type'
  }
];

type Props = {
  activeSectionName?: string;
};

const ChildrenTable = ({ activeSectionName }: Props) => {
  // TODO Fix type
  const sections = useSelector((state: any) => state.course?.sections);
  const children =
    sections?.find((item: any) => item.title === activeSectionName)?.children ||
    [];

  return children && children.length > 0 ? (
    <Wrapper>
      <Table dataSource={children}>
        <Column title="Название курса" dataIndex="title" key="title" />
        <Column title="Тип" dataIndex="type" key="type" />
        <Column
          title="Инструменты"
          render={(text, record) => (
            <Space size="middle">
              <div>Редактировать</div>
              <div>Удалить</div>
            </Space>
          )}
        />
      </Table>
    </Wrapper>
  ) : null;
};

export default ChildrenTable;
