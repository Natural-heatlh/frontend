import React, { useState, useCallback, useEffect } from 'react';
import { Form, Input, Tabs, Popconfirm, Checkbox } from 'antd';
import styled from 'styled-components';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, connect } from 'react-redux';
import { setCourse } from '../../../slices/admin/course';
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
}

const AddForm = ({ course }: Props) => {
  const [state, setState] = useState<AdminCourse>({
    description: '',
    image: '',
    sections: [],
    title: '',
    isFree: false,
    isPublished: false
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
      setState({ ...state, ...course, [mode]: e.target.value });
    },
    [course, state]
  );

  const changeImage = useCallback(
    (value) => {
      setState({ ...state, ...course, image: value });
    },
    [course, state]
  );

  const handleChangeActiveTab = useCallback(
    (key: string) => {
      setActiveTabKey(key);
    },
    [setActiveTabKey]
  );

  const updateIsFree = useCallback(() => {
    setState((current) => ({ ...current, isFree: !current.isFree }));
  }, []);

  const updateIsPublished = useCallback(() => {
    setState((current) => ({ ...current, isPublished: !current.isPublished }));
  }, []);

  const onConfirm = useCallback(
    (title) => {
      setState({
        ...state,
        ...course,
        sections: course.sections?.filter((item) => item?.title !== title)
      });
    },
    [course, state]
  );

  const handleEditSection = useCallback(
    (value) => {
      const exists = course?.sections?.find((item) => item?.title === value);
      if (exists) {
        setIsExists(!!exists);
        setTimeout(() => setIsExists(false), 1000);
      } else if (value) {
        setState({
          ...state,
          ...course,
          sections: course.sections?.map((item, index) =>
            index === editableSectionIndex ? { ...item, title: value } : item
          )
        });
        handleChangeActiveTab(value);
      }
      setEditingMode(false);
    },
    [course, state, handleChangeActiveTab, editableSectionIndex]
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
        <ImageUploader onChange={changeImage} />
        <Form.Item label="Описание курса" name="courseDescription">
          <Input.TextArea
            onBlur={(e) => changeString(e, 'description')}
            rows={3}
          />
        </Form.Item>
        <Form.Item label="Бесплатный курс" name="isFree">
          <Checkbox onChange={updateIsFree} />
        </Form.Item>
        <Form.Item label="Опубликованный курс" name="isPublished">
          <Checkbox onChange={updateIsPublished} />
        </Form.Item>
        <div>
          <h2>Разделы курса</h2>
          <AddSection
            handleChangeActiveTab={handleChangeActiveTab}
            setCourse={setState}
          />
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
                closeIcon={
                  <Popconfirm
                    title="Вы действительно хотите удалить?"
                    onConfirm={() => onConfirm(section?.title)}
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
          state.sections?.find((_, index) => index === editableSectionIndex)
            ?.title as string
        }
        error={isExists ? 'Раздел с таким именем существует!' : ''}
        onErrorClose={() => setIsExists(false)}
      />
      <Footer />
    </>
  );
};

const mapStateToProps = (state: Record<string, any>) => ({
  course: state?.course
});

export default connect(mapStateToProps)(AddForm);