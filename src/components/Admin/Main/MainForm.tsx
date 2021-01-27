import React, { useState, useCallback } from 'react';
import { Form, Input, Tabs, Popconfirm, Checkbox } from 'antd';
import styled from 'styled-components';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { FormInstance } from 'antd/es/form';
import {
  setCourse,
  toggleIsFree,
  toggleIsPublished,
  updateCourseDescription, updateCourseImage,
  updateCourseTitle
} from '../../../slices/admin/course';
import { AdminCourse } from '../../../types';
import Footer from '../Footer';
import AddModal from './AddModal';
import AddSection from './AddSection';
import AddSectionChild from './AddSectionChild';
import ImageUploader from './UploadImage';

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

interface Props {
  course: AdminCourse;
  form: FormInstance;
  handleSave: () => void;
}

const MainForm = ({ course, form, handleSave }: Props) => {
  const [isEditing, setEditingMode] = useState(false);
  const [editableSectionId, setEditableId] = useState<string>('');
  const [isExists, setIsExists] = useState<boolean>(false);
  const [activeTabKey, setActiveTabKey] = useState<string>('');

  const dispatch = useDispatch();

  const changeText = useCallback(
    (e, mode) => {
      if (mode === 'title') {
        dispatch(updateCourseTitle(e.target.value));
      }
      if (mode === 'description') {
        dispatch(updateCourseDescription(e.target.value));
      }
    },
    [dispatch]
  );

  const changeImage = useCallback(
    (value) => {
      dispatch(updateCourseImage(value));
    },
    [dispatch]
  );

  const handleChangeActiveTab = useCallback(
    (key: string) => {
      setActiveTabKey(key);
    },
    [setActiveTabKey]
  );

  const updateIsFree = useCallback(() => {
    dispatch(toggleIsFree());
  }, [dispatch]);

  const updateIsPublished = useCallback(() => {
    dispatch(toggleIsPublished());
  }, [dispatch]);

  const onConfirm = useCallback(
    (sectionId) => {
      dispatch(
        setCourse({
          ...course,
          sections: course.sections?.filter(
            (item) => item?.sectionId !== sectionId
          )
        })
      );
    },
    [course, dispatch]
  );

  const handleEditSection = useCallback(
    (value) => {
      const exists = course?.sections?.find((item) => item?.title === value);
      if (exists) {
        setIsExists(!!exists);
        setTimeout(() => setIsExists(false), 1000);
      } else if (value) {
        dispatch(
          setCourse({
            ...course,
            sections: course.sections?.map((item) =>
              item?.sectionId === editableSectionId
                ? { ...item, title: value }
                : item
            )
          })
        );
        handleChangeActiveTab(value);
      }
      setEditingMode(false);
    },
    [course, dispatch, handleChangeActiveTab, editableSectionId]
  );

  const onEditButtonClick = useCallback(
    (sectionId: string) => {
      setEditingMode(true);
      setEditableId(sectionId);
    },
    [setEditingMode, setEditableId]
  );

  return (
    <>
      <Form
        onFinish={() => {
          console.log('finish');
        }}
        form={form}
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
          <Input onChange={(e) => changeText(e, 'title')} />
        </Form.Item>
        <ImageUploader
          onChange={changeImage}
          imageUrl={form.getFieldsValue()?.image}
        />
        <Form.Item label="Описание курса" name="description">
          <Input.TextArea
            rows={3}
            onChange={(e) => changeText(e, 'description')}
          />
        </Form.Item>
        <Form.Item label="Бесплатный курс" name="isFree">
          <Checkbox checked={course.isFree} onChange={updateIsFree} />
        </Form.Item>
        <Form.Item label="Опубликованный курс" name="isPublished">
          <Checkbox checked={course.isPublished} onChange={updateIsPublished} />
        </Form.Item>
        <div>
          <h2>Разделы курса</h2>
          <AddSection handleChangeActiveTab={handleChangeActiveTab} />
          <Tabs
            type="editable-card"
            activeKey={activeTabKey}
            onTabClick={handleChangeActiveTab}
            hideAdd
          >
            {course.sections?.map((section, i) => (
              <TabPane
                tab={
                  <TabTitleWrapper>
                    {section?.title}
                    <EditIconWrapper
                      onClick={() => onEditButtonClick(section.sectionId)}
                    >
                      <EditOutlined />
                    </EditIconWrapper>
                  </TabTitleWrapper>
                }
                key={section?.sectionId}
                closeIcon={
                  <Popconfirm
                    title="Вы действительно хотите удалить?"
                    onConfirm={() => onConfirm(section?.sectionId)}
                    okText="Да"
                    cancelText="Нет"
                  >
                    <CloseOutlined />
                  </Popconfirm>
                }
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
          course.sections?.find((item) => item.sectionId === editableSectionId)
            ?.title as string
        }
        error={isExists ? 'Раздел с таким именем существует!' : ''}
        onErrorClose={() => setIsExists(false)}
      />
      <Footer save={handleSave} />
    </>
  );
};

export default MainForm;
