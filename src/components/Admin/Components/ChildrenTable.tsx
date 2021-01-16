import React, {useCallback, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import {Table, Space, Button, Drawer, Popconfirm} from 'antd';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import {ContentType} from '../../../types';
import TheoryComponent from '../Add/Theory';
import Video from '../Add/Video';
import TestComponent from '../Add/Test';
import { removeSectionChild, setSectionChild, editSectionChild } from '../../../slices/admin/course';

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
  const [drawerIsOpened, setIsOpened] = useState(false);
  const [currentContent, setCurrentContent] = useState({ content: { type: '' }, index: null});
  const [isEditMode, setEditMode] = useState(false);

  const sections = useSelector((state: any) => state.course?.sections);
  const children =
    sections?.find((item: any) => item.title === activeSectionName)?.children ||
    [];
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentContent.content.type) {
      setIsOpened(true);
    }
  }, [currentContent, isEditMode])

  const reset = useCallback(() => {
    setIsOpened(false);
    setCurrentContent({content: { type: '' }, index: null});
    setEditMode(false);
  }, []);

  const handleAddChild = useCallback(
    (child) => {
      const payload = {
        child,
        activeSection: activeSectionName,
        activeSectionChildIndex: currentContent?.index
      };

      if (isEditMode) {
        dispatch(editSectionChild(payload));
      } else {
        dispatch(setSectionChild(payload));
      }

      setIsOpened(false);
      reset();
    },
    [activeSectionName, currentContent, dispatch, isEditMode, reset]
  );

  const onEdit = useCallback((content, index) => {
    setCurrentContent({content, index});
    setEditMode(true);
  }, [])

  const onDelete = useCallback((content) => {
    const payload = {
      activeSectionName,
      activeSectionChild: content?.title,
    };
    dispatch(removeSectionChild(payload));
  }, [activeSectionName, dispatch]);

  return children && children.length > 0 ? (
    <>
      <Wrapper>
        <Table dataSource={children}>
          <Column title="Название курса" dataIndex="title" key="title" />
          <Column title="Тип" dataIndex="type" key="type" />
          <Column
            title="Инструменты"
            render={(text, record, index) => {
              return <Space size="middle">
                <Button onClick={() => onEdit(record, index)}>Редактировать</Button>
                <Popconfirm
                  title="Вы действительно хотите удалить?"
                  onConfirm={() => onDelete(record)}
                  okText="Да"
                  cancelText="Нет"
                >
                  <Button danger={true}>Удалить</Button>
                </Popconfirm>
              </Space>
            }}
          />
        </Table>
      </Wrapper>
      <Drawer
        title="Редактировать элемент"
        placement="right"
        closable={false}
        width="80%"
        onClose={() => reset()}
        visible={drawerIsOpened}
      >
        {currentContent?.content?.type === ContentType.THEORY && (
          <TheoryComponent handleAddChild={handleAddChild} content={currentContent?.content} open={drawerIsOpened} />
        )}
        {currentContent?.content?.type === ContentType.VIDEO && (
          <Video handleAddChild={handleAddChild} content={currentContent?.content} open={drawerIsOpened} />
        )}
        {currentContent?.content?.type === ContentType.TEST && (
          <TestComponent handleAddChild={handleAddChild} content={currentContent?.content} open={drawerIsOpened} />
        )}
      </Drawer>
    </>
  ) : null;
};

export default ChildrenTable;
