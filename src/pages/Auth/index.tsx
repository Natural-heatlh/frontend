import React, { useCallback } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';

import { Route } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import SignUpForm from '../../components/Auth/SignUpForm';
import SignInForm from '../../components/Auth/SignInForm';

const LOGIN_PATH = '/auth/login';
const SIGN_UP_PATH = '/auth/signup';

const getAuthPageTitle = (path: string) => {
  if (path === LOGIN_PATH) {
    return 'Авторизация';
  }
  if (path === SIGN_UP_PATH) {
    return 'Регистрация';
  }
  return '';
};

const Auth = () => {
  const location = useLocation();
  const pageTitle = getAuthPageTitle(location.pathname);

  const handleSignUp = useCallback((values) => {
    axios
      .post('http://localhost:3000/auth/signup', {
        ...values
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <PageContainer pageTitle={pageTitle}>
      <Route path={LOGIN_PATH}>
        <SignInForm />
      </Route>
      <Route path={SIGN_UP_PATH}>
        <SignUpForm signUp={handleSignUp} />
      </Route>
    </PageContainer>
  );
};

export default Auth;
