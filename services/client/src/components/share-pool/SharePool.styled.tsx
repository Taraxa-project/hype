import styled from 'styled-components';
import Input from '../input/Input';

export const ShareUrl = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

export const ShareOnButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

export const SocialButton = styled.div`
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.75rem;
  border: none;
  background: ${({ theme }) => theme.buttons.primary.background};
  color: ${({ theme }) => theme.buttons.primary.color};
  font-size: 1rem;
  padding: 1rem 4.5rem;
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.buttons.primary.hover};
  }

  :disabled {
    background: #ececec;
    border: 0.063rem solid #e0e0e0;
    color: #c2c2c2;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 1rem 0.5rem;
  }
`;

export const FormInput = styled(Input)`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
  }
`;
