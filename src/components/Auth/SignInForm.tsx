import React, { useCallback } from 'react';
import { Input, Button, Form } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
import axios from '../../helpers/axios';
import { setIsAuth } from '../../slices/auth';
import { getValidationErrors } from '../../utils/getValidationErrors';

const SignInForm = () => {
  usePageTitle('Авторизация');

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    handleSignIn(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleSignIn = useCallback(
    (values) => {
      axios
        .post('/auth/login', {
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

            console.log(data);

            form.setFields(data);
          }
        });
    },
    [dispatch]
  );

  return (
    <StyledForm
      layout="vertical"
      name="basic"
      initialValues={{
        remember: true
      }}
      form={form}
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
