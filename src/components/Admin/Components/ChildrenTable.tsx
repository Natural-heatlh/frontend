import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import {Table, Space, Button, Drawer, Popconfirm} from 'antd';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import {ContentType} from '../../../types';
import TheoryComponent from '../Add/Theory';
import Video from '../Add/Video';
import TestComponent from '../Add/Test';
import { removeSectionChild, setSectionChild } from '../../../slices/admin/course';

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
  const sections = useSelector((state: any) => state.course?.sections);
  const children =
    sections?.find((item: any) => item.title === activeSectionName)?.children ||
    [];
  const dispatch = useDispatch();

  const handleAddChild = useCallback(
    (child) => {
      const payload = {
        child,
        activeSection: activeSectionName
      };
      dispatch(setSectionChild(payload));
      setIsOpened(false);
    },
    [activeSectionName, dispatch]
  );

  const onEdit = useCallback((content) => {
    setCurrentContent(content);
    setSelected(content?.type)
    // console.log('llll >', content, currentContent)
    setIsOpened(true);
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
