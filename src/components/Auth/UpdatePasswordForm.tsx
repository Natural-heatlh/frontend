import React, { useEffect, useState } from 'react';
import { Input, Button } from 'antd';
import { useParams, useHistory } from 'react-router';
import axios from '../../helpers/axios';
import { ReactComponent as AuthLogo } from '../../static/authLogo.svg';
import {
  FormHead,
  FormHeadImageWrapper,
  FormItem,
  StyledForm,
  SubmitFormItem
} from '../Forms/Additional';

interface Props {
  reset: ({ email }: { email: string }) => void;
}

type UrlParams = {
  token?: string;
};

const UpdatePasswordForm = () => {
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
