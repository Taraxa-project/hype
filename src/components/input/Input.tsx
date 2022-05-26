import React from "react";
import styled from "styled-components";
import SearchIcon from "../../assets/icons/Search";

interface StyledInputProps {
  Icon?: React.ReactNode;
}

const StyledInput = styled.input<StyledInputProps>`
  box-sizing: border-box;

  border-radius: 0.75rem;
  border: 1px solid #e0e0e0;
  background: #fafafa;
  color: #595959;
  font-size: 1rem;
  width: 100%;
  min-height: 2.5rem;
  text-align: center;
  padding: 10px;

  :focus,
  :active,
  :hover {
    border: 0.125rem solid #eb8f4c !important;
    background: #f7f7f7;
  }

  :disabled {
    background: #f1f1f1;
    border: 0.063rem solid #e0e0e0;
    color: #e0e0e0;
  }
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  label?: string;
  Icon?: React.ReactNode;
}

const Input = ({ ...props }: InputProps) => {
  return props.Icon ? (
    <div style={{ width: "100%", marginBottom: "0.600rem" }}>
      <SearchIcon />
      <StyledInput {...props} placeholder={props.label} />
    </div>
  ) : (
    <StyledInput {...props} placeholder={props.label} />
  );
};

Input.defaultProps = {
  disabled: false,
  label: "Your address...",
};

export default Input;
