import React from "react";
import styled from "styled-components";

interface CustomStyledProps {
  variant?: "primary" | "secondary";
  size?: "small" | "regular" | "full-width";
}

const StyledButton = styled.button<CustomStyledProps>`
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.75rem;
  border: ${(props) =>
    props.variant === "primary" ? "none" : "0.063rem solid #C2C2C2"};
  background: ${(props) =>
    props.variant === "primary" ? "#dda25d" : "#E0E0E0"};
  color: ${(props) => (props.variant === "primary" ? "#fff" : "#595959")};
  font-size: 1rem;
  padding: ${(props) =>
    props.size === "small" ? "1rem 0.5rem" : "1rem 4.5rem"};
  ${(props) => props.size === "full-width" && "width: 100%;"}

  :hover {
    background: ${(props) =>
      props.variant === "primary" ? "#e4aa65" : "#ECECEC"};
  }

  :disabled {
    background: #ececec;
    border: 0.063rem solid #e0e0e0;
    color: #c2c2c2;
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element | string;
  variant?: "primary" | "secondary";
  size?: "small" | "regular" | "full-width";
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
  variant: "primary",
  size: "small",
  disabled: false,
};

export default Button;
