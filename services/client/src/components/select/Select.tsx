import React, { forwardRef } from 'react';
import { StyledSelect, StyledSearchIcon } from './Select.styled';

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    React.PropsWithoutRef<JSX.IntrinsicElements['select']> {
  disabled?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({ ...props }, ref) => {
  return props.icon ? (
    <div style={{ width: '100%' }}>
      <StyledSearchIcon>{props.icon}</StyledSearchIcon>
      <StyledSelect {...props} placeholder={props.placeholder} ref={ref} />
    </div>
  ) : (
    <StyledSelect {...props} placeholder={props.placeholder} ref={ref} />
  );
});

Select.defaultProps = {
  disabled: false,
};

export default Select;
