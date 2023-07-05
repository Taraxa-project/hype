import styled from 'styled-components';

export const ShareOnButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-content: start;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 1rem;
  }
`;
