import React from 'react';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { FormItem, SubmitFormItem } from '../../components/Forms/Additional';
import query from './query.graphql';

const StyledForm = styled(Form)`
  max-width: 640px;
`;

const { useForm } = Form;

const UpdatePasswordForm = () => {
  const [form] = useForm();
  const [updateUserPassword] = useMutation(query.UpdateUserPassword);

  const onFinish = (values: any) => {
    const { password, currentPassword } = values;
    updateUserPassword({
      variables: {
        currentPassword,
        password
      }
    })
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => console.log(error));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <StyledForm
      layout="vertical"
      form={form}
      name="basic"
      initialValues={{
        remember: true
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <FormItem
        label="Текущий пароль"
        name="currentPassword"
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите текущий пароль!'
          }
        ]}
      >
        <Input.Password />
      </FormItem>

      <FormItem
        label="Новый пароль"
        name="password"
        rules={[
          {
            required: true,
            message:
              'Пожалуйста введите новый пароль, минимальная длина пароля 8!',
            min: 8
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </FormItem>
      <FormItem
        label="Повторите новый пароль"
        name="confirm"
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Пожалуйста подтвердите новый пароль!',
            min: 8
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('Пароли не совпадают!');
            }
          })
        ]}
      >
        <Input.Password />
      </FormItem>

      <SubmitFormItem>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          Сохранить
        </Button>
      </SubmitFormItem>
    </StyledForm>
  );
};

export default UpdatePasswordForm;
