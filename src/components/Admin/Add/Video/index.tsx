import React, { useCallback, useEffect, useState } from 'react';
import { Input, Form, Button, Alert } from 'antd';
import { Video as VideoType } from '../../../../graphql';

interface State {
  visible: boolean;
  type?: 'success' | 'error' | 'info' | 'warning' | undefined;
  message?: string;
}

type Props = {
  handleAddChild: (child: VideoType) => void;
};

const Video = ({ handleAddChild }: Props) => {
  const [alert, setAlert] = useState<State>({ visible: false } as State);
  const [form] = Form.useForm();

  useEffect(() => {
    if (alert) {
      setTimeout(() => setAlert({ visible: false }), 5000);
    }
  }, [alert]);

  const onFinish = useCallback(
    (values) => {
      handleAddChild({
        ...values,
        type: 'Video'
      });
    },
    [handleAddChild]
  );

  const onFinishFailed = useCallback(() => {
    setAlert({
      visible: true,
      type: 'error',
      message: 'Ошибка!'
    });
  }, []);

  return (
    <React.Fragment>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
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
        {alert?.visible && (
          <Alert message={alert?.message} type={alert?.type} />
        )}
      </Form>
    </React.Fragment>
  );
};

export default Video;