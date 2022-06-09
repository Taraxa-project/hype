import React from 'react';
import styled from 'styled-components';
import SearchIcon from '../../assets/icons/Search';

interface StyledInputProps {
  Icon?: React.ReactNode;
  className?: string;
}

const InputWrapper = styled.div`
  margin-bottom: 0.6rem;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    margin-left: 1rem;
  }
`;

const StyledInput = styled.input<StyledInputProps>`
  box-sizing: border-box;

  border-radius: 0.75rem;
  border: 0.063rem solid #e0e0e0;
  background: #fafafa;
  color: #595959;
  font-size: 0.875rem;
  text-align: left;
  padding: ${(props) => (props.Icon ? `0.75rem 2rem 0.75rem 3.5rem` : `0.75rem 2rem 0.75rem 1rem`)};

  :focus,
  :active,
  :hover {
    border: 0.063rem solid #eb8f4c;
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
  Icon?: React.ReactNode;
  className?: string;
}

const Input = ({ ...props }: InputProps) => {
  return props.Icon ? (
    <InputWrapper>
      <SearchIcon />
      <StyledInput {...props} />
    </InputWrapper>
  ) : (
    <StyledInput {...props} />
  );
};

Input.defaultProps = {
  disabled: false,
  label: 'Your address...',
};

export default Input;
