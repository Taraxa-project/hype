import styled from 'styled-components';

export const ShareOnButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
  align-items: center;
  justify-content: flex-end;
`;
