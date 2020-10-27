import React from 'react';
import { Button, DatePicker, version } from 'antd';

const Admin = () => {
  return (
    <div style={{ paddingTop: 30 }}>
      <h1>antd version: {version}</h1>
      <DatePicker/>
      <Button type="primary" style={{ marginLeft: 8 }}>
        Primary Button
      </Button>
    </div>
  )
};

export default Admin;
