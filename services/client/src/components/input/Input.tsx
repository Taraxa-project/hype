import React from 'react';
import SearchIcon from '../../assets/icons/Search';
import { StyledInput } from './Input.styled';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  label?: string;
  Icon?: React.ReactNode;
}

const Input = ({ ...props }: InputProps) => {
  return props.Icon ? (
    <div style={{ width: '100%', marginBottom: '0.600rem' }}>
      <SearchIcon />
      <StyledInput {...props} placeholder={props.label} />
    </div>
  ) : (
    <StyledInput {...props} placeholder={props.label} />
  );
};

Input.defaultProps = {
  disabled: false,
  label: 'Your address...',
};

export default Input;
