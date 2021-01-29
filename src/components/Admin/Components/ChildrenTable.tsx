import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Table, Space, Button, Popconfirm } from 'antd';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Section, SectionChildren } from '../../../graphql';
import { removeSectionChild } from '../../../slices/actions';

const Wrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const { Column } = Table;

type Props = {
  activeSectionId?: string | null;
  onEdit: (child: SectionChildren) => void;
};

const ChildrenTable = ({ activeSectionId, onEdit }: Props) => {
  const sections = useSelector((state: any) => state.course?.sections);

  const children = useMemo(
    () =>
      sections
        ?.find((item: Section) => item.sectionId === activeSectionId)
        ?.children.map((item: SectionChildren) => ({ ...item, key: item.lectureId })) || [],
    [sections, activeSectionId]
  );

  const dispatch = useDispatch();

  const onDelete = useCallback(
    (content) => {
      const payload = {
        sectionId: activeSectionId,
        removableId: content?.lectureId
      };
      dispatch(removeSectionChild(payload));
    },
    [activeSectionId, dispatch]
  );

  const handleEdit = useCallback(
    (child) => {
      if (child) {
        delete child.key;
        onEdit(child);
      }
    },
    [onEdit]
  );

  return children && children.length > 0 ? (
    <>
      <Wrapper>
        <Table dataSource={children}>
          <Column title="Название курса" dataIndex="title" key="title" />
          <Column title="Тип" dataIndex="type" key="type" />
          <Column
            title="Инструменты"
            render={(text, record, index) => {
              return (
                <Space size="middle">
                  <Button onClick={() => handleEdit(record)}>
                    Редактировать
                  </Button>
                  <Popconfirm
                    title="Вы действительно хотите удалить?"
                    onConfirm={() => onDelete(record)}
                    okText="Да"
                    cancelText="Нет"
                  >
                    <Button danger={true}>Удалить</Button>
                  </Popconfirm>
                </Space>
              );
            }}
          />
        </Table>
      </Wrapper>
    </>
  ) : null;
};

export default ChildrenTable;
