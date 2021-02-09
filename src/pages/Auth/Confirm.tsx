import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { useParams, useHistory } from 'react-router';
import axios from '../../helpers/axios';
import Preloader from '../../components/Preloader';

type UrlParams = {
  token?: string;
};

const Confirm = () => {
  const params = useParams<UrlParams>();
  const history = useHistory();

  useEffect(() => {
    axios
      .post(`/auth/confirmation/${params?.token}`)
      .then((resp: any) => {
        if (resp?.data?.redirectUrl) {
          history.replace(resp?.data?.redirectUrl);
        }
      })
      .catch(({ response }) => {
        if (response.data?.error) {
          Modal.error({
            title: 'Ошибка',
            content: 'Что то пошло не так. Попробуйте еще раз!',
            onOk: () => {
              history.replace('/auth/login');
            }
          });
        }
      });
  }, [params, history]);

  return <Preloader />;
};

export default Confirm;
