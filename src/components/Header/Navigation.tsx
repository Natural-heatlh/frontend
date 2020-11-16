import React, { Fragment, useCallback, useState } from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link, useLocation, LinkProps } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as KnowledgeIcon } from '../../static/knowledge.svg';
import { ReactComponent as GroupIcon } from '../../static/group.svg';

const LinkText = styled.span`
  margin-left: 8px;
`;

type NavItemProps = LinkProps & {
  active?: boolean;
};

export const NavItem = styled(Link)<NavItemProps>`
  display: flex;
  align-items: center;
  color: #fff;
  height: 100%;
  padding-left: 25px;
  padding-right: 25px;

  &:hover {
    background: #88d1cc;
    color: #fff;
    height: 100%;
  }

  ${(props) => props.active && `background: #88d1cc;`}
`;

const StyledDropdown = styled(Dropdown)`
  background: #88d1cc;
`;

const StyledMenu = styled(Menu)`
  background: #88d1cc;
  color: #fff;
`;

const MenuItem = styled(Menu.Item)`
  color: #fff;

  &:hover {
    background: none;
    color: #007d75;
  }
`;

const Navigation = () => {
  const [visible, changeVisible] = useState(false);
  const location = useLocation();

  const handleVisibleChange = useCallback(
    (flag) => {
      changeVisible(flag);
    },
    [changeVisible]
  );

  const coursesItem = (
    <StyledMenu onClick={() => changeVisible(false)}>
      <MenuItem key="1">Clicking me will not close the menu.</MenuItem>
      <MenuItem key="2">Clicking me will not close the menu also.</MenuItem>
      <MenuItem key="3">Clicking me will close the menu.</MenuItem>
    </StyledMenu>
  );

  return (
    <Fragment>
      <StyledDropdown
        overlay={coursesItem}
        visible={visible}
        onVisibleChange={handleVisibleChange}
      >
        <NavItem active={location.pathname === '/courses/'} to="/courses">
          <KnowledgeIcon />
          <LinkText>
            Курсы <DownOutlined />
          </LinkText>
        </NavItem>
      </StyledDropdown>
      <NavItem active={location.pathname === '/my-courses/'} to="/my-courses/">
        <GroupIcon />
        <LinkText>Моё обучение</LinkText>
      </NavItem>
    </Fragment>
  );
};

export default Navigation;
