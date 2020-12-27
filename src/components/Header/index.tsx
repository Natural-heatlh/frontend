import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

const Header = () => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const courses = useSelector((state: any) => state.courses);

  return (
    <HeaderWrapper>
      <StyledContend>
        <HeaderLeft>
          <Logo to="/">
            <LogoImg />
          </Logo>
          {isLoggedIn && courses && courses.length > 0 ? (
            <Navigation courses={courses} />
          ) : null}
        </HeaderLeft>
        <HeaderRight isLoggedIn={isLoggedIn} />
      </StyledContend>
    </HeaderWrapper>
  );
};

export default Header;
