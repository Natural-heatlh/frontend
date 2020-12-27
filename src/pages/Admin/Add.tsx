import React from 'react';
import AddForm from '../../components/Admin/Add/AddForm';
import {usePageTitle} from '../../hooks/usePageTitle';
import AdminContainer from './Container';

const Add = () => {
  usePageTitle('Добавить курс');
  return (
    <AdminContainer>
      <AddForm />
    </AdminContainer>
  );
};

export default Add;
