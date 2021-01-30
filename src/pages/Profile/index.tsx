import React from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';
import OwnDataForm from './OwnData';
import UpdatePasswordForm from './UpdatePassword';

const { TabPane } = Tabs;

const StyledPageContainer = styled(PageContainer)`
  background: #fff;
`;

const Profile = () => (
  <StyledPageContainer pageTitle="Личный кабинет">
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
  </StyledPageContainer>
);

export default Profile;
