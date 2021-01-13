import React, { useCallback, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import { FormItem, SubmitFormItem } from '../../components/Forms/Additional';
import authQuery from '../../components/Auth/query.graphql';
import Preloader from '../../components/Preloader';
import query from './query.graphql';

const StyledForm = styled(Form)`
  max-width: 640px;
`;

const { useForm } = Form;

const OwnDataForm = () => {
  const { data, loading, error } = useQuery(authQuery.CurrentUser);
  const [updateUserData] = useMutation(query.UpdateUserData);

  const [form] = useForm();

  useEffect(() => {
    if (data && data.currentUser) {
      form.setFieldsValue(data.currentUser);
    }
  }, [data]);

  const handleUpdate = useCallback(
    async (values) => {
      await updateUserData({
        variables: {
          input: { ...values }
        }
      });
    },
    [updateUserData]
  );

  const onFinish = (values: any) => {
    handleUpdate(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  if (loading) return <Preloader />;

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
        label="Имя"
        name="firstName"
        rules={[
          {
            message: 'Пожалуйста введите Ваш имя!'
          }
        ]}
      >
        <Input placeholder="Имя" />
      </FormItem>

      <FormItem
        label="Фамилия"
        name="lastName"
        rules={[
          {
            message: 'Пожалуйста введите фамилию!'
          }
        ]}
      >
        <Input placeholder="Фамилия" />
      </FormItem>
      <FormItem
        label="Страна"
        name="country"
        rules={[
          {
            message: 'Пожалуйста введите страну!'
          }
        ]}
      >
        <Input placeholder="Страна" />
      </FormItem>
      <FormItem
        label="Город"
        name="city"
        rules={[
          {
            message: 'Пожалуйста введите город!'
          }
        ]}
      >
        <Input placeholder="Город" />
      </FormItem>
      <FormItem
        label="Телефон"
        name="phone"
        rules={[
          {
            message: 'Пожалуйста введите телефон!'
          }
        ]}
      >
        <Input placeholder="Телефон" />
      </FormItem>
      <FormItem
        label="ID"
        name="partnerID"
        rules={[
          {
            message: 'Пожалуйста введите ID!'
          }
        ]}
      >
        <Input placeholder="ID" />
      </FormItem>

      <SubmitFormItem>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          Сохранить
        </Button>
      </SubmitFormItem>
    </StyledForm>
  );
};

export default OwnDataForm;
