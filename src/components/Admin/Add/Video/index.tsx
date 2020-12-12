import React, {useCallback, useEffect, useState} from 'react';
import { Input, Form, Button, Alert } from 'antd';

interface State {
  visible: boolean,
  type?: 'success' | 'error' | 'info' | 'warning' | undefined,
  message?: string,
}

const Video = () => {
  const [alert, setAlert] = useState<State>({ visible: false } as State);

  useEffect(() => {
    if (alert) {
      setTimeout(() => setAlert({ visible: false }), 5000);
    }
  }, [alert]);

  const onFinish = useCallback(
    (values) => {
      // redux action
      console.log(values)
      setAlert({
        visible: true,
        type: 'success',
        message: 'Успех!',
      });
    },
    []
  );

  const onFinishFailed = useCallback(
    () => {
      setAlert({
        visible: true,
        type: 'error',
        message: 'Ошибка!',
      });
    },
    []
  );

  return (
    <React.Fragment>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Заголовок видео"
          name="videoTitle"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите заголовок видео!'
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ссылка на видео"
          name="videoLink"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите ссылку на видео!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Принять
          </Button>
        </Form.Item>
        { alert?.visible && <Alert message={alert?.message} type={alert?.type} /> }
      </Form>
    </React.Fragment>
  );
};

export default Video;
