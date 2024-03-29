import React from 'react';
import { ButtonVariant } from '../../utils';
import { StyledButton } from './Button.styled';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element | string;
  variant?: ButtonVariant;
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
  size: 'regular',
  disabled: false,
};

export default Button;
