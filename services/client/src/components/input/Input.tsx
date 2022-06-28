import React, { forwardRef } from 'react';
import SearchIcon from '../../assets/icons/Search';
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
    <div style={{ width: '100%', marginBottom: '0.600rem' }}>
      <StyledSearchIcon>
        <SearchIcon />
      </StyledSearchIcon>
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
