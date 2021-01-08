import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router';
import axios from '../../helpers/axios';
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

type UrlParams = {
  token?: string;
};

const UpdatePasswordForm = ({ reset }: Props) => {
  const params = useParams<UrlParams>();
  const history = useHistory();
  const [state, updateState] = useState({
    userId: null,
    token: null
  });

  useEffect(() => {
    axios
      .get(`/auth/check-token/${params.token}`)
      .then((res) => {
        handleRedirect(res);
        updateState({
          userId: res.data.userId,
          token: res.data.token
        });
      })
      .catch((err) => console.log(err));
  }, [params, updateState]);

  const handleUpdate = (password: string) => {
    axios
      .post('/auth/update-password', {
        ...state,
        password
      })
      .then((res) => {
        handleRedirect(res);
      })
      .catch((err) => console.log(err));
  };

  const handleRedirect = (res: any) => {
    if (res.data.redirectUrl) {
      history.replace(res.data.redirectUrl);
    }
  };

  if (!params.token) {
    history.replace('/auth/login');
  }

  const onFinish = (values: any) => {
    console.log(values);
    handleUpdate(values?.password);
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
      </FormHead>

      <FormItem
        label="Новый пароль"
        name="password"
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите Ваш новый пароль!'
          }
        ]}
      >
        <Input.Password placeholder="Новый пароль" />
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
