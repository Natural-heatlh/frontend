import React, { useState, useCallback, useEffect } from 'react';
import { Form, Input, Tabs } from 'antd';
import styled from 'styled-components';
import { EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setCourse } from '../../../slices/admin/course';
import { AdminCourse } from '../../../types';
import AddModal from './AddModal';
import AddSection from './AddSection';
import AddSectionChild from './AddSectionChild';

const { TabPane } = Tabs;

const TabTitleWrapper = styled.span`
  display: flex;
`;

const EditIconWrapper = styled.a`
  margin-left: 6px;
  display: flex;
  align-items: center;
  &:hover svg {
    fill: rgba(0, 0, 0, 1);
  }
`;

const AddForm = () => {
  const [state, setState] = useState<AdminCourse>({
    description: '',
    image: '',
    sections: [],
    title: ''
  });

  const [isEditing, setEditingMode] = useState(false);
  const [editableSectionIndex, setIndex] = useState<number | null>(null);
  const [isExists, setIsExists] = useState<boolean>(false);
  const [activeTabKey, setActiveTabKey] = useState<string>('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCourse(state));
  }, [dispatch, state]);

  const changeString = useCallback(
    (e, mode) => {
      setState({ ...state, [mode]: e.target.value });
    },
    [state]
  );

  const handleChangeActiveTab = useCallback(
    (key: string) => {
      setActiveTabKey(key);
    },
    [setActiveTabKey]
  );

  const onRemove = useCallback(
    (targetKey, action) => {
      if (action === 'remove') {
        setState({
          ...state,
          sections: state.sections?.filter((item) => item?.title !== targetKey)
        });
      }
    },
    [state]
  );

  const handleEditSection = useCallback(
    (value) => {
      const exists = state?.sections?.find((item) => item?.title === value);
      if (exists) {
        setIsExists(!!exists);
        setTimeout(() => setIsExists(false), 1000);
      } else if (value) {
        setState({
          ...state,
          sections: state.sections?.map((item, index) =>
            index === editableSectionIndex ? { ...item, title: value } : item
          )
        });
        handleChangeActiveTab(value);
      }
      setEditingMode(false);
    },
    [editableSectionIndex, state]
  );

  return (
    <>
      <Form
        onFinish={() => {
          console.log('finish');
        }}
        layout="vertical"
      >
        <Form.Item
          label="Заголовок курса"
          name="title"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите назавание курса!'
            }
          ]}
        >
          <Input onBlur={(e) => changeString(e, 'title')} />
        </Form.Item>
        <Form.Item label="Описание курса" name="courseDescription">
          <Input.TextArea
            onBlur={(e) => changeString(e, 'description')}
            rows={3}
          />
        </Form.Item>
        <div>
          <h2>Разделы курса</h2>
          <AddSection
            handleChangeActiveTab={handleChangeActiveTab}
            course={state}
            setCourse={setState}
          />
          <Tabs
            type="editable-card"
            activeKey={activeTabKey}
            onEdit={onRemove}
            onTabClick={handleChangeActiveTab}
            hideAdd
          >
            {state.sections?.map((section, i) => (
              <TabPane
                tab={
                  <TabTitleWrapper>
                    {section?.title}
                    <EditIconWrapper
                      onClick={() => {
                        setEditingMode(true);
                        setIndex(i);
                      }}
                    >
                      <EditOutlined />
                    </EditIconWrapper>
                  </TabTitleWrapper>
                }
                key={section?.title}
              >
                <AddSectionChild activeSection={activeTabKey} />
              </TabPane>
            ))}
          </Tabs>
        </div>
      </Form>
      <AddModal
        title="Редактирование"
        visible={isEditing}
        setMode={setEditingMode}
        onOk={handleEditSection}
        okText="Изменить"
        cancelText="Отменить изменение"
        propsValue={
          state.sections?.find((_, index) => index === editableSectionIndex)
            ?.title as string
        }
        error={isExists ? 'Раздел с таким именем существует!' : ''}
        onErrorClose={() => setIsExists(false)}
      />
    </>
  );
};

export default AddForm;
