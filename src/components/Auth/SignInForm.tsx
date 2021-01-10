import React from 'react';
import { Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import {
  FormHead,
  FormHeadImageWrapper,
  FormHeadText,
  FormItem,
  StyledForm,
  SubmitFormItem
} from '../Forms/Additional';
import { ReactComponent as AuthLogo } from '../../static/authLogo.svg';
import { usePageTitle } from '../../hooks/usePageTitle';

interface Props {
  signIn: ({ email, password }: { email: string; password: string }) => void;
}

const SignInForm = ({ signIn }: Props) => {
  usePageTitle('Авторизация');

  const onFinish = (values: any) => {
    signIn(values);
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
          У вас нет аккаунта? <Link to="/auth/signup">Регистрация</Link>
        </FormHeadText>
      </FormHead>

      <FormItem
        label="Электронная почта"
        name="email"
        rules={[
          {
            required: true,
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
            message: 'Пожалуйста введите пароль!'
          }
        ]}
      >
        <Input.Password placeholder="Пароль" />
      </FormItem>
      <Link to="/auth/reset/">Забыли пароль?</Link>

      <SubmitFormItem>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          Войти
        </Button>
      </SubmitFormItem>
    </StyledForm>
  );
};

export default SignInForm;
