import React from "react";
import styled from "styled-components";


const StyledInput = styled.input`
  box-sizing: border-box;

  border-radius: 0.75rem;
  border: 0.063rem solid #e0e0e0;
  background: #fafafa;
  color: #595959;
  font-size: 1rem;
  width: 100%;
  min-height: 2.5rem;
  text-align: center;

  :focus, :active, :hover {
    border: 0.125rem solid #EB8F4C !important;
    background: #F7F7F7;
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
}

const Input = ({ ...props }: InputProps) => {
  return (
    <StyledInput {...props} placeholder={props.label}/>
  );
};

Input.defaultProps = {
  disabled: false,
  label: 'Your address...'
};

export default Input;
