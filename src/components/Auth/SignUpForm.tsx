import React, { useCallback } from 'react';
import { Input, Button, Form } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ReactComponent as AuthLogo } from '../../static/authLogo.svg';
import { usePageTitle } from '../../hooks/usePageTitle';
import axios from '../../helpers/axios';
import { setIsAuth } from '../../slices/auth';
import { getValidationErrors } from '../../utils/getValidationErrors';
import {
  FormHead,
  FormHeadImageWrapper,
  FormHeadText,
  FormItem,
  StyledForm,
  SubmitFormItem
} from '../Forms/Additional';

const SignUpForm = () => {
  usePageTitle('Регистрация нового пользователя');
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const handleSignUp = useCallback(
    (values) => {
      axios
        .post('/auth/signup', {
          ...values
        })
        .then(() => {
          dispatch(setIsAuth(true));
        })
        .catch(({ response }) => {
          const values = form.getFieldsValue();

          if (response?.data?.errors?.errors) {
            const data = getValidationErrors(
              values,
              response.data.errors.errors
            );

            form.setFields(data);
          }
        });
    },
    [dispatch, form]
  );

  const onFinish = (values: any) => {
    handleSignUp(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <StyledForm
      form={form}
      layout="vertical"
      name="basic"
      initialValues={{
        remember: true
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <FormHead>
        <FormHeadImageWrapper>
          <AuthLogo />
        </FormHeadImageWrapper>

        <FormHeadText>
          Уже есть аккаунт? <Link to="/auth/login">Войти</Link>
        </FormHeadText>
      </FormHead>

      <FormItem
        label="Имя"
        name="firstName"
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите Ваше имя!',
            min: 2
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
            required: true,
            message: 'Пожалуйста введите Вашу фамилию!',
            min: 2
          }
        ]}
      >
        <Input placeholder="Фамилия" />
      </FormItem>
      <FormItem
        label="Электронная почта"
        name="email"
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Пожалуйста введите Ваш email!',
            min: 4
          }
        ]}
      >
        <Input placeholder="Электронная почта" />
      </FormItem>

      <FormItem
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            min: 8,
            message: 'Пожалуйста введите Ваш пароль. Минимальная длина пароля 8!'
          }
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Пароль" />
      </FormItem>

      <FormItem
        label="Подтверждение пароля"
        name="confirm"
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Пожалуйста подтвердите пароль!',
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
        <Input.Password placeholder="Подтверждение пароля" />
      </FormItem>

      <FormItem
        label="Номер телефона"
        name="phone"
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите номер телефона!'
          }
        ]}
      >
        <Input />
      </FormItem>

      <FormItem
        label="Partner ID"
        name="partnerID"
        rules={[
          {
            message: 'partner ID должен состоять из 8 цифр!',
            max: 8,
          }
        ]}
      >
        <Input type="number" />
      </FormItem>

      <SubmitFormItem>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
      </SubmitFormItem>
    </StyledForm>
  );
};

export default SignUpForm;
