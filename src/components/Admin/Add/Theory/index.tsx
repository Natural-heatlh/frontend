import React, {useCallback, useEffect, useState} from 'react';
import {Input, Form, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { setTheory } from '../../../../slices/actions';
import { Theory } from '../../../../graphql';

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const TheoryComponent = () => {
  const [state, setState] = useState<Theory>({
   title: "", content: '', slides: [], audio: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTheory(state as Theory))
  }, [dispatch, state]);

  const onFinish = useCallback(
    (values) => {
      setState(values);
      // redux action
      console.log(values)
      // setAlert({
      //   visible: true,
      //   type: 'success',
      //   message: 'Успех!',
      // });
    },
    []
  );

  const onFinishFailed = useCallback(
    () => {
      // setAlert({
      //   visible: true,
      //   type: 'error',
      //   message: 'Ошибка!',
      // });
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
          name="title"
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
          name="content"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите текст теории!'
            }
          ]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          label="Ссылка на аудио"
          name="audio"
        >
          <Input />
        </Form.Item>
        <Form.List name="slides">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, i) => (
                <SliderWrapper key={i}>
                  <Form.Item
                    label={`${i+1}. Ссылка на слайд`}
                    key={i}
                    // name={`${i+1}_testTitle`}
                    name={[field.name, `url`]}
                    rules={[
                      {
                        required: true,
                        message: 'Пожалуйста введите ссылку на слайд!'
                      }
                    ]}
                    style={{ width: '100%', marginBottom: '50px' }}
                  >
                    <Input
                      placeholder={'Введите ссылку на слайд'}
                      key={`${i+1}_key`}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
              </SliderWrapper>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Добавить слайд
                </Button>
              </Form.Item>
            </>
          )}
          </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Принять
          </Button>
        </Form.Item>
        {/*{ alert?.visible && <Alert message={alert?.message} type={alert?.type} /> }*/}
      </Form>
    </React.Fragment>
  );
};

export default TheoryComponent;
