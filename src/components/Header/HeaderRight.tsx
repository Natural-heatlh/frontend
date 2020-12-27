import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router';
import { useApolloClient } from '@apollo/client';
import axios from '../../helpers/axios';
import query from '../Auth/query.graphql';
import { NavItem } from './Navigation';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`;

interface Props {
  isLoggedIn?: boolean;
}

const HeaderRight = ({ isLoggedIn }: Props) => {
  const location = useLocation();
  const history = useHistory();

  const logout = useCallback(() => {
    axios
      .post('/auth/logout')
      .then((response) => {
        history.replace('/auth/login');
      })
      .catch((e) => console.log(e));
  }, [history]);

  return !isLoggedIn ? (
    <Wrapper>
      <NavItem active={location.pathname === '/auth/signup'} to="/auth/signup">
        Регистрация
      </NavItem>
      <NavItem active={location.pathname === '/auth/login'} to="/auth/login">
        Вход
      </NavItem>
    </Wrapper>
  ) : (
    <NavItem
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (logout) {
          logout();
        }
      }}
      to="/logout"
    >
      Выход
    </NavItem>
  );
};

export default HeaderRight;
