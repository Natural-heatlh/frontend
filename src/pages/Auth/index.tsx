import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Redirect, Route } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import SignUpForm from '../../components/Auth/SignUpForm';
import SignInForm from '../../components/Auth/SignInForm';
import ResetForm from '../../components/Auth/ResetForm';
import UpdatePasswordForm from '../../components/Auth/UpdatePasswordForm';

const LOGIN_PATH = '/auth/login';
const SIGN_UP_PATH = '/auth/signup';
const RESET_PATH = '/auth/reset';
const UPDATE_PASSWORD = '/auth/update-password/:token?';

const getAuthPageTitle = (path: string) => {
  if (path === LOGIN_PATH) {
    return 'Авторизация';
  }
  if (path === SIGN_UP_PATH) {
    return 'Регистрация';
  }
  if (path === RESET_PATH) {
    return 'Восстановить пароль';
  }
  return '';
};

const Auth = () => {
  const location = useLocation();
  const pageTitle = getAuthPageTitle(location.pathname);
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  return (
    <PageContainer pageTitle={pageTitle}>
      {!isLoggedIn ? (
        <Fragment>
          <Route path={LOGIN_PATH}>
            <SignInForm />
          </Route>
          <Route path={SIGN_UP_PATH}>
            <SignUpForm />
          </Route>
          <Route path={RESET_PATH}>
            <ResetForm />
          </Route>
          <Route path={UPDATE_PASSWORD}>
            <UpdatePasswordForm />
          </Route>
        </Fragment>
      ) : (
        <Redirect to="/courses" />
      )}
    </PageContainer>
  );
};

export default Auth;
