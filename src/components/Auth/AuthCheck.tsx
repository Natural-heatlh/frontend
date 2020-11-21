import React, { Fragment } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setIsAuth } from '../../slices/actions';
import Preloader from '../Preloader';
import query from './query.graphql';

type Props = {
  children: React.ReactNode;
};

const AuthCheck = ({ children }: Props) => {
  const { data, loading } = useQuery(query.CurrentUser, {
    fetchPolicy: 'network-only'
  });

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  if (loading) return <Preloader />;

  if (data?.currentUser) {
    dispatch(setIsAuth(true));
  }

  return (
    <Fragment>{isLoggedIn ? children : <Redirect to="/auth/login" />}</Fragment>
  );
};

export default AuthCheck;
