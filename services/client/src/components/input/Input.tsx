import React, { forwardRef } from 'react';
import SearchIcon from '../../assets/icons/Search';
import { StyledInput } from './Input.styled';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, React.PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  disabled?: boolean;
  placeholder?: string;
  Icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return props.Icon ? (
    <div style={{ width: '100%', marginBottom: '0.600rem' }}>
      <SearchIcon />
      <StyledInput {...props} placeholder={props.placeholder} ref={ref}/>
    </div>
  ) : (
    <StyledInput {...props} placeholder={props.placeholder} ref={ref}/>
  );
});

Input.defaultProps = {
  disabled: false,
};

export default Input;
