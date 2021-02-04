import React, { useCallback, useEffect, useState } from 'react';
import { Input, Button, Modal } from 'antd';
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

  const handleRedirect = useCallback(
    (res: any) => {
      if (res.data.redirectUrl) {
        history.replace(res.data.redirectUrl);
      }
    },
    [history]
  );

  useEffect(() => {
    axios
      .get(`/auth/check-token/${params.token}`)
      .then((res) => {
        updateState({
          userId: res.data.userId,
          token: res.data.token
        });
      })
      .catch(({ response }) => {
        if (response?.data?.message) {
          history.replace('/auth/login');

          Modal.error({
            title: 'Ошибка!',
            content: response?.data?.message,
            onOk: () => {
              history.replace('/auth/login');
            },
            okText: 'Закрыть'
          });
        }
      });
  }, [params, updateState, handleRedirect, history]);

  const handleUpdate = useCallback(
    (password: string) => {
      axios
        .post('/auth/update-password', {
          ...state,
          password
        })
        .then((res) => {
          handleRedirect(res);
        })
        .catch((err) => console.log(err));
    },
    [handleRedirect, state]
  );

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
