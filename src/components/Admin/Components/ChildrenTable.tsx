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
  const [selected, setSelected] = useState('');
  const [currentContent, setCurrentContent] = useState();
  const [currentTitle, setCurrentTitle] = useState('');
  const [isEditMode, setEditMode] = useState(false);

  const sections = useSelector((state: any) => state.course?.sections);
  const children =
    sections?.find((item: any) => item.title === activeSectionName)?.children ||
    [];
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentContent) {
      setIsOpened(true);
      setEditMode(true);
    }
  }, [currentContent])

  const handleAddChild = useCallback(
    (child) => {
      const payload = {
        child,
        activeSection: activeSectionName,
        activeSectionChild: currentTitle
      };

      if (isEditMode) {
        dispatch(editSectionChild(payload));
      } else {
        dispatch(setSectionChild(payload));
      }

      setIsOpened(false);
    },
    [activeSectionName, currentTitle, dispatch, isEditMode]
  );

  const onEdit = useCallback((content) => {
    setCurrentTitle(content?.title);
    setCurrentContent(content);
    setSelected(content?.type);
  }, [])

  const onDelete = useCallback((content) => {
    const payload = {
      activeSectionName,
      activeSectionChild: content?.title,
    };
    dispatch(removeSectionChild(payload));
  }, [activeSectionName, dispatch]);

  const onDrawerClose = useCallback(() => {
    setIsOpened(false);
    setCurrentContent(undefined);
    setEditMode(false);
    setCurrentTitle('');
  }, [])

  return children && children.length > 0 ? (
    <>
      <Wrapper>
        <Table dataSource={children}>
          <Column title="Название курса" dataIndex="title" key="title" />
          <Column title="Тип" dataIndex="type" key="type" />
          <Column
            title="Инструменты"
            render={(text, record) => {
              return <Space size="middle">
                <Button onClick={() => onEdit(record)}>Редактировать</Button>
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
        onClose={() => onDrawerClose()}
        visible={drawerIsOpened}
      >
        {selected === ContentType.THEORY && (
          <TheoryComponent handleAddChild={handleAddChild} content={currentContent} open={drawerIsOpened} />
        )}
        {selected === ContentType.VIDEO && (
          <Video handleAddChild={handleAddChild} content={currentContent} open={drawerIsOpened} />
        )}
        {selected === ContentType.TEST && (
          <TestComponent handleAddChild={handleAddChild} content={currentContent} open={drawerIsOpened} />
        )}
      </Drawer>
    </>
  ) : null;
};

export default ChildrenTable;
