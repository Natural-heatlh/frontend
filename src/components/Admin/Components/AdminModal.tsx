import React from 'react';
import { Modal } from 'antd';

type Props = {
  visible?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
  okText?: string;
  cancelText?: string;
  onOk?: (value: any) => void;
  bodyStyle?: any;
  title?: string;
};

const AdminModal = ({
  visible,
  children,
  onClose,
  okText,
  cancelText,
  onOk,
  bodyStyle,
  title
}: Props) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onClose}
      okText={okText}
      cancelText={cancelText}
      onOk={onOk}
      bodyStyle={bodyStyle}
    >
      {children}
    </Modal>
  );
};

export default AdminModal;
