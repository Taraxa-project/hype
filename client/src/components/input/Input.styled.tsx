import styled from 'styled-components';

interface StyledInputProps {
  Icon?: React.ReactNode;
}

export const StyledInput = styled.input<StyledInputProps>`
  box-sizing: border-box;

  border-radius: 0.75rem;
  border: 1px solid #e0e0e0;
  background: #fafafa;
  color: #595959;
  font-size: 1rem;
  width: 100%;
  min-height: 2.5rem;
  text-align: left;
  padding: 0.625rem;
  padding-left: 3rem;
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