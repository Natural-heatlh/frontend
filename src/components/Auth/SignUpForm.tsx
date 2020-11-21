import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as AuthLogo } from '../../static/authLogo.svg';

const StyledForm = styled(Form)`
  max-width: 384px;
  width: 100%;
  margin: 0 auto;
  padding: 48px 32px;
  background: #ffffff;
  border-radius: 5px;
  margin-bottom: 100px;
`;

const FormHeadImageWrapper = styled.div`
  margin-bottom: 20px;
`;

const FormHead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const FormHeadText = styled.p`
  font-size: 16px;
  line-height: 28px;
  margin-bottom: 0;
`;

const FormItem = styled(Form.Item)`
  margin-bottom: 12px;
`;

const SubmitFormItem = styled(FormItem)`
  margin-top: 24px;
  margin-bottom: 0;
`;

const PWD_ERROR_MESSAGE = 'Пароли не совпадают! Пожалуйста введите еще раз!';

interface Props {
  signUp: (options: any) => void;
}

const SignUpForm = ({ signUp }: Props) => {
  const [checked, setChecked] = useState(false);
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

  console.log('checked', checked);

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

      <FormItem name="isPartner">
        <Checkbox checked={checked} onChange={() => setChecked(!checked)}>
          Являюсь партнером компании
        </Checkbox>
      </FormItem>

      {checked ? (
        <FormItem
          label="ID"
          name="partnerID"
          rules={[
            {
              message: 'Пожалуйста введите пароль ID!'
            }
          ]}
        >
          <Input />
        </FormItem>
      ) : null}

      <SubmitFormItem>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
      </SubmitFormItem>
    </StyledForm>
  );
};

export default SignUpForm;
