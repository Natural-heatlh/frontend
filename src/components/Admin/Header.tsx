import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const AdminHeader = () => {
  return (
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">
          <Link to="/admin/courses">Курсы</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/admin/users">Пользователи</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default AdminHeader;
