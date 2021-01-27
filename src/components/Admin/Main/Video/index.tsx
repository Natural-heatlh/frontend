import React, { useCallback, useEffect } from 'react';
import { Input, Form, Button } from 'antd';
import { FormInstance } from 'antd/es/form';
import { Video as VideoType } from '../../../../graphql';

type Props = {
  onSubmit: (child: VideoType) => void;
  content?: Record<any, any> | undefined;
  form: FormInstance;
};

const Video = ({ onSubmit, content, form }: Props) => {
  useEffect(() => {
    if (content) {
      form.setFieldsValue({
        ...content
      });
    }
  }, [form, content]);

  const onFinish = useCallback(() => {
    const fields = form.getFieldsValue();

    onSubmit({
      ...content,
      ...fields,
      type: 'Video'
    });
  }, [onSubmit, form, content]);

  const onFinishFailed = useCallback(() => {
    console.log('Ошибка в форме с Видео');
  }, []);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      initialValues={content}
    >
      <Form.Item
        label="Заголовок видео"
        name="title"
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите заголовок видео!'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Ссылка на видео"
        name="url"
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите ссылку на видео!'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Принять
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Video;
