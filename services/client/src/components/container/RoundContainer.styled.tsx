import styled from 'styled-components';
import Box from '../styles/Box';

export const RoundContainer = styled(Box)`
  background: ${({ theme }) => theme.colors.greys[1]};
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1.2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.7rem;
  }
`;
