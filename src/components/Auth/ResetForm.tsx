import React from 'react';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
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
