import React, {useState, useCallback} from 'react';
import { Form, Input, Tabs } from 'antd';
import styled from 'styled-components';

import { CreateCourseInput } from '../../../graphql';
import EditIcon from '../Icons/EditIcon';

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

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

const AddForm = () => {
  const [state, setState] = useState<CreateCourseInput>({
    title: '',
    description: '',
    sections: []
  });
  const [isEditing, setEditingMode] = useState(false);
  const [editableSectionIndex, setIndex] = useState<number | null>(null);
  const [isExists, setIsExists] = useState<boolean>(false);

  const onRemove = useCallback((targetKey, action) => {
    if (action === 'remove') {
      setState({
        ...state,
        sections: state.sections?.filter(item => item?.title !== targetKey),
      });
    }
  }, [state]);

  const handleEditSection = useCallback((value) => {
    const exists = state?.sections?.find(item => item?.title === value);
    if (exists) {
      setIsExists(!!exists);
      setTimeout(() => setIsExists(false), 1000);
    } else if (value) {
      setState({
        ...state,
        sections: state.sections?.map((item, index) =>
          index === editableSectionIndex ? { ...item, title: value } : item),
      });
    }
    setEditingMode(false);
  }, [editableSectionIndex, state]);

  return (
    <>
      <AddModal
        title="Редактирование"
        visible={isEditing}
        setMode={setEditingMode}
        onOk={handleEditSection}
        okText="Изменить"
        cancelText="Отменить изменение"
        propsValue={
          state.sections?.find((_, index) => index === editableSectionIndex)?.title as string
        }
        error={isExists ? 'Раздел с таким именем существует!' : ''}
        onErrorClose={() => setIsExists(false)}
      />
      <Form
        {...layout}
        onFinish={() => {
          console.log('finish');
        }}
      >
        <Form.Item
          label="Заголовок курса"
          name="courseTitle"
          rules={[
            {
              message: 'Пожалуйста введите назавание курса!'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Описание курса" name="courseDescription">
          <Input />
        </Form.Item>
        <div>
          <h2>Разделы курса</h2>
          <AddSection course={state} setCourse={setState} />
          <Tabs
            type="editable-card"
            onEdit={onRemove}
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
                      <EditIcon />
                    </EditIconWrapper>
                  </TabTitleWrapper>
                }
                key={section?.title}
              >
                <AddSectionChild />
              </TabPane>
            ))}
          </Tabs>
        </div>
      </Form>
    </>
  )
};

export default AddForm;
