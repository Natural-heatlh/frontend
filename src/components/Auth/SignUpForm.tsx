import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { ReactComponent as AuthLogo } from '../../static/authLogo.svg';
import { usePageTitle } from '../../hooks/usePageTitle';
import {
  FormHead,
  FormHeadImageWrapper,
  FormHeadText,
  FormItem,
  StyledForm,
  SubmitFormItem
} from '../Forms/Additional';

const PWD_ERROR_MESSAGE = 'Пароли не совпадают! Пожалуйста введите еще раз!';

interface Props {
  signUp: (options: any) => void;
}

const SignUpForm = ({ signUp }: Props) => {
  usePageTitle('Регистрация нового пользователя');
  const [firstPassword, setFirstPassword] = useState('');

  const checkSecondPassword = (rule: any, value: string) => {
    if (
      firstPassword.length > 0 &&
      value.length > 0 &&
      firstPassword === value
    ) {
      return Promise.resolve();
    }
    return Promise.reject(PWD_ERROR_MESSAGE);
  };

  const onFinish = (values: any) => {
    const { isPartner, partnerID, ...rest } = values;
    const newUser = isPartner ? { ...rest, partnerID } : { ...rest };
    signUp(newUser);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <StyledForm
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
            message: 'Пожалуйста введите Ваше имя!'
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
            message: 'Пожалуйста введите Вашу фамилию!'
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
            message: 'Пожалуйста введите Ваш email!'
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
            message: 'Пожалуйста введите Ваш пароль!'
          }
        ]}
      >
        <Input.Password
          onChange={(e) => setFirstPassword(e.target.value)}
          placeholder="Пароль"
        />
      </FormItem>

      <FormItem
        label="Подтверждение пароля"
        name="passwordCopy"
        rules={[
          {
            validator: checkSecondPassword
          }
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
            message: 'Пожалуйста введите пароль ID!'
          }
        ]}
      >
        <Input />
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
