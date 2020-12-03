import React, { createContext, Fragment } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setIsAuth } from '../../slices/actions';
import Preloader from '../Preloader';
import {User} from '../../graphql';
import query from './query.graphql';

type Props = {
  children: React.ReactNode;
};

export const AuthContext = createContext<User | null>(null);

const AuthCheck = ({ children }: Props) => {
  const { data, loading, error } = useQuery(query.CurrentUser, {
    fetchPolicy: 'network-only'
  });

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  if (loading) return <Preloader />;

  if (data?.currentUser) {
    dispatch(setIsAuth(true));
  }

  return (
    <>
      {isLoggedIn ? (
        <AuthContext.Provider value={data?.currentUser}>
          {children}
        </AuthContext.Provider>
      ) : (
        <Redirect to="/auth/login" />
      )}
    </>
  );
};

export default AuthCheck;
