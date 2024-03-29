import React, { forwardRef } from 'react';
import { StyledInput, StyledSearchIcon } from './Input.styled';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    React.PropsWithoutRef<JSX.IntrinsicElements['input']> {
  disabled?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return props.icon ? (
    <div style={{ width: '100%' }}>
      <StyledSearchIcon>{props.icon}</StyledSearchIcon>
      <StyledInput {...props} placeholder={props.placeholder} ref={ref} />
    </div>
  ) : (
    <StyledInput {...props} placeholder={props.placeholder} ref={ref} />
  );
});

Input.defaultProps = {
  disabled: false,
};

export default Input;
