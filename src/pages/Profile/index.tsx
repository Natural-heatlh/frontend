import React from 'react';
import { Tabs } from 'antd';
import PageContainer from '../../components/PageContainer';
import OwnDataForm from './OwnData';
import UpdatePasswordForm from './UpdatePassword';

const { TabPane } = Tabs;

const Profile = () => (
  <PageContainer pageTitle="Личный кабинет">
    <Tabs>
      <TabPane tab="Личные даннные" key="1">
        <OwnDataForm />
      </TabPane>
      <TabPane tab="Пароль" key="2">
        <UpdatePasswordForm />
      </TabPane>
      <TabPane tab="Сертификаты" key="3">
        Сертификаты
      </TabPane>
    </Tabs>
  </PageContainer>
);

export default Profile;
