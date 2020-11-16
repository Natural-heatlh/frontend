import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoImg } from '../../static/logo.svg';
import Container from '../Container';
import Navigation from './Navigation';
import HeaderRight from './HeaderRight';

const StyledContend = styled(Container)`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
`;

const HeaderWrapper = styled.div`
  height: 72px;
  width: 100%;
  background: #55beb6;
  display: flex;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: 88px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
`;

interface Props {
  isAuth?: boolean;
}

const Header = ({ isAuth }: Props) => {
  return (
    <HeaderWrapper>
      <StyledContend>
        <HeaderLeft>
          <Logo to="/courses">
            <LogoImg />
          </Logo>
          {isAuth ? <Navigation /> : null}
        </HeaderLeft>

        <HeaderRight />
      </StyledContend>
    </HeaderWrapper>
  );
};

export default Header;
