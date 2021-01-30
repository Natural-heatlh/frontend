import React, { useCallback, useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ReactComponent as LogoutIcon } from '../../static/icons/profile/export.svg';
import { ReactComponent as SettingsIcon } from '../../static/icons/profile/setting.svg';
import axios from '../../helpers/axios';
import { AuthContext } from '../Auth/AuthCheck';
import { NavItem } from './Navigation';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`;

const StyledLink = styled(Link)`
  height: 40px;
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 500;
  padding: 10px 25px;

  span {
    display: block;
    margin-left: 8px;
  }
`;

const ProfileDropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #55beb6;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const ProfileButton = styled.div`
  color: #fff;
  height: calc(100% - 10px);
  display: flex;
  align-items: center;
  max-width: 216px;
  cursor: pointer;

  span {
    width: calc(100% - 70px)
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const Circle = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  display: flex;
  border-radius: 50%;
  font-size: 20px;
  color: #55beb6;
  background: #fff;
  margin-right: 12px;
  align-items: center;
  justify-content: center;
  border: 2px solid #f5f5f5;
`;

interface Props {
  isLoggedIn?: boolean;
}

const HeaderRight = ({ isLoggedIn }: Props) => {
  const location = useLocation();
  const history = useHistory();
  const [visible, changeVisible] = useState(false);
  const userContext = useContext(AuthContext);

  const logout = useCallback(
    (e) => {
      e.preventDefault();

      axios
        .post('/auth/logout')
        .then((response) => {
          history.replace('/auth/login');
        })
        .catch((e) => console.log(e));
    },
    [history]
  );

  const handleVisibleChange = useCallback(
    (flag) => {
      changeVisible(flag);
    },
    [changeVisible]
  );

  const profileLinks = useMemo(
    () => (
      <ProfileDropdownWrapper>
        <StyledLink to="/profile">
          <SettingsIcon width={20} height={20} /> <span>Настройки</span>
        </StyledLink>
        <StyledLink onClick={logout} to="/logout">
          <LogoutIcon width={20} height={20} /> <span>Выход</span>
        </StyledLink>
      </ProfileDropdownWrapper>
    ),
    [logout]
  );

  const firstName = userContext?.firstName;
  const lastName = userContext?.lastName;

  const profileName =
    firstName && lastName ? `${firstName} ${lastName}` : 'Профиль';

  const initials =
    firstName && lastName
      ? firstName[0].concat(lastName[0]).toUpperCase()
      : undefined;

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
    <Dropdown
      overlay={profileLinks}
      placement="topCenter"
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      <ProfileButton>
        {initials ? <Circle>{initials}</Circle> : null}
        <span>{profileName}</span>
        <DownOutlined width={50} height={50} />
      </ProfileButton>
    </Dropdown>
  );
};

export default HeaderRight;
