import React from 'react';
import { Input, Button } from 'antd';
import {
  FormHead,
  FormHeadImageWrapper,
  FormHeadText,
  FormItem,
  StyledForm,
  SubmitFormItem
} from '../Forms/Additional';
import { ReactComponent as AuthLogo } from '../../static/authLogo.svg';

interface Props {
  reset: ({ email }: { email: string }) => void;
}

const ResetForm = ({ reset }: Props) => {
  const onFinish = (values: any) => {
    reset(values);
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
          Пожалуйста, введите email от вашего аккаунта!
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

      <SubmitFormItem>
        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
          Отправить
        </Button>
      </SubmitFormItem>
    </StyledForm>
  );
};

export default ResetForm;
