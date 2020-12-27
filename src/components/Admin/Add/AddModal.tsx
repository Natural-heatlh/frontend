import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input, Alert } from 'antd';
import { usePrevious } from '../../../utils';

import AdminModal from '../Components/AdminModal';

const SectionNameInput = styled(Input)`
  max-width: 680px;
  width: 100%;
  margin: 0 10px 10px 0;
`;

const AddingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

type Props = {
  visible: boolean;
  setMode: (bool: boolean) => void;
  onOk: (value: any) => void;
  okText: string;
  cancelText: string;
  propsValue?: string;
  title: string;
  error?: string;
  onErrorClose?: () => void;
};

const AddModal = ({
  visible,
  setMode,
  onOk,
  okText,
  cancelText,
  propsValue,
  title,
  error,
  onErrorClose
}: Props) => {
  const [value, updateValue] = useState<string>(propsValue || '');

  const prev = usePrevious(propsValue);

  useEffect(() => {
    if (prev !== propsValue && propsValue) {
      updateValue(propsValue);
    }
  }, [propsValue, value, updateValue, prev]);

  return (
    <AdminModal
      title={title}
      visible={visible}
      onClose={() => {
        updateValue('');
        setMode(false);
      }}
      onOk={() => {
        if (!error) {
          onOk(value);
          updateValue('');
        }
      }}
      okText={okText}
      cancelText={cancelText}
      bodyStyle={{
        paddingTop: '56px'
      }}
    >
      <AddingWrapper>
        <SectionNameInput
          placeholder="Название раздела"
          value={value}
          onChange={(e) => updateValue(e.target.value)}
        />
        {error ? (
          <Alert type="error" message={error} onClose={onErrorClose} closable />
        ) : null}
      </AddingWrapper>
    </AdminModal>
  );
};

export default AddModal;
