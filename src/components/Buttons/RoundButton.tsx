import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  padding: 8px;
  width: 34px;
  height: 34px;
  cursor: pointer;
  background: ${(props) => (!props.disabled ? '#007D75' : 'transparent')};
  margin-right: 8px;
  border-radius: 50%;

  ${(props) => props.disabled && `border: 1px solid rgba(38, 38, 38, 0.5);`}
`;

type Props = {
  onClick?: () => void;
  children?: React.ReactNode;
};

const RoundButton = ({ onClick, children, ...rest }: Props) => {
  return (
    <Button onClick={onClick} {...rest}>
      {children}
    </Button>
  );
};

export default RoundButton;
