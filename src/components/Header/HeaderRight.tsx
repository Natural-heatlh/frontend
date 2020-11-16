import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import Navigation, { NavItem } from './Navigation';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`;

interface Props {
  isAuth?: boolean;
}

const HeaderRight = ({ isAuth }: Props) => {
  const location = useLocation();

  return !isAuth ? (
    <Wrapper>
      <NavItem active={location.pathname === '/auth/signup'} to="/auth/signup">
        Регистрация
      </NavItem>
      <NavItem active={location.pathname === '/auth/login'} to="/auth/login">
        Вход
      </NavItem>
    </Wrapper>
  ) : null;
};

export default HeaderRight;
