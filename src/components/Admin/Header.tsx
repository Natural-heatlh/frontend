import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Header } = Layout;
const COURSES_PAGE = '/admin/courses';
const USERS_PAGE = '/admin/users';

const AdminHeader = () => {
  const location = useLocation();
  return (
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
        <Menu.Item key={COURSES_PAGE}>
          <Link to="/admin/courses">Курсы</Link>
        </Menu.Item>
        <Menu.Item key={USERS_PAGE}>
          <Link to="/admin/users">Пользователи</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default AdminHeader;
