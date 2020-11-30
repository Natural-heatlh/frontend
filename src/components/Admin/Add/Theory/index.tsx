import React, { useCallback, useState } from 'react';
import {Input, Form, Button, Alert} from 'antd';

interface State {
  visible: boolean,
  type?: 'success' | 'error' | 'info' | 'warning' | undefined,
  message?: string,
}

const Theory = () => {
  const [alert, setAlert] = useState<State>({ visible: false } as State);

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
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Заголовок теории"
          name="theoryTitle"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите заголовок теории!'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Теория"
          name="theoryContent"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите текст теории!'
            }
          ]}
        >
          <Input.TextArea rows={5} />
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

export default Theory;
