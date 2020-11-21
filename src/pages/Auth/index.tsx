import React, { Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Redirect, Route } from 'react-router-dom';
import axios from '../../helpers/axios';
import PageContainer from '../../components/PageContainer';
import SignUpForm from '../../components/Auth/SignUpForm';
import SignInForm from '../../components/Auth/SignInForm';
import { setIsAuth } from '../../slices/actions';

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
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleSignUp = useCallback(
    (values) => {
      axios
        .post('/auth/signup', {
          ...values
        })
        .then(() => {
          dispatch(setIsAuth(true));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [dispatch]
  );

  const handleSignIn = useCallback(
    (values) => {
      axios
        .post('/auth/login', {
          ...values
        })
        .then(() => {
          dispatch(setIsAuth(true));
        })
        .catch((error) => console.log(error));
    },
    [dispatch]
  );

  return (
    <PageContainer pageTitle={pageTitle}>
      {!isLoggedIn ? (
        <Fragment>
          <Route path={LOGIN_PATH}>
            <SignInForm signIn={handleSignIn} />
          </Route>
          <Route path={SIGN_UP_PATH}>
            <SignUpForm signUp={handleSignUp} />
          </Route>
        </Fragment>
      ) : (
        <Redirect to="/courses" />
      )}
    </PageContainer>
  );
};

export default Auth;
