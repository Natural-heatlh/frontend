import React, { useState } from 'react';
import { Form, Input, Tabs } from 'antd';
import { Course } from '../../graphql';
import AddSection from './Add/AddSection';
import AddChild from './Add/AddChild';

const { TabPane } = Tabs;

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

const AddForm = () => {
  const [state, setState] = useState<Course>({
    id: 'new-course',
    title: '',
    description: '',
    sections: []
  });

  return (
    <Form
      {...layout}
      onFinish={() => {
        console.log('finish');
      }}
    >
      <Form.Item
        label="Заговок курса"
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
        <Tabs>
          {state.sections?.map((section) => (
            <TabPane
              tab={section?.title}
              key={section?.title + new Date().toString()}
            >
              <AddChild />
            </TabPane>
          ))}
        </Tabs>
      </div>
    </Form>
  );
};

export default AddForm;
