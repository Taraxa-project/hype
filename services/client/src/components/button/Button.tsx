import React from 'react';
import { StyledButton } from './Button.styled';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element | string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
  size?: 'small' | 'regular' | 'full-width';
  disabled?: boolean;
}

const Button = ({ children, variant, size, ...props }: ButtonProps) => {
  return (
    <StyledButton variant={variant} size={size} {...props}>
      {children}
    </StyledButton>
  );
};

Button.defaultProps = {
  variant: 'primary',
  size: 'small',
  disabled: false,
};

export default Button;
