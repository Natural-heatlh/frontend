import React, { useCallback } from 'react';
import { Input, Button, Modal, Form } from 'antd';
import { ReactComponent as AuthLogo } from '../../static/authLogo.svg';
import axios from '../../helpers/axios';
import { getValidationErrors } from '../../utils/getValidationErrors';
import {
  FormHead,
  FormHeadImageWrapper,
  FormHeadText,
  FormItem,
  StyledForm,
  SubmitFormItem
} from '../Forms/Additional';

const ResetForm = () => {
  const [form] = Form.useForm();

  const handleReset = useCallback(
    async (values) => {
      try {
        const result = await axios.post('/auth/reset-password/', {
          ...values
        });
        if (result && result?.data?.success) {
          Modal.info({
            title: 'Проверьте Вашу почту!',
            content:
              'Мы отправили Вам письмо со ссылкой для восстановления пароля!'
          });
        }
      } catch (e) {
        const values = form.getFieldsValue();

        if (e?.response?.data?.errors) {
          const data = getValidationErrors(values, e?.response.data.errors);

          form.setFields(data);
        }
      }
    },
    [form]
  );

  const onFinish = (values: any) => {
    handleReset(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <StyledForm
      layout="vertical"
      name="basic"
      form={form}
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
