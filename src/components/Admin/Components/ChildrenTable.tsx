import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Table, Space, Button, Popconfirm } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Section, SectionChildren } from '../../../graphql';
import {
  changeLectureOrder,
  removeSectionChild
} from '../../../slices/actions';

const Wrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const ChangeSortButton = styled.div`
  display: block;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    border: 1px dashed #000;
  }
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
        ?.children.map((item: SectionChildren) => ({
          ...item,
          key: item.lectureId
        })) || [],
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

  const handleResort = useCallback(
    (currentIndex, destinationIndex) => {
      if (destinationIndex >= 0 && destinationIndex <= children?.length - 1) {
        const payload = {
          sectionId: activeSectionId,
          currentIndex,
          destinationIndex
        };
        dispatch(changeLectureOrder(payload));
      }
    },
    [activeSectionId, children, dispatch]
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

                  {index !== 0 ? (
                    <ChangeSortButton
                      onClick={() => handleResort(index, index - 1)}
                    >
                      <UpOutlined />
                    </ChangeSortButton>
                  ) : null}

                  {index !== children?.length - 1 ? (
                    <ChangeSortButton
                      onClick={() => handleResort(index, index + 1)}
                    >
                      <DownOutlined />
                    </ChangeSortButton>
                  ) : null}
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
