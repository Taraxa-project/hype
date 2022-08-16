import styled from 'styled-components';

export const Account = styled.div`
  background: #ececec;
  border-radius: 1.625rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.greys[11]};
  padding: 0.375rem 1.5rem;
  margin-left: 2rem;
  word-break: break-word;
`;

export const BlockiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  padding-right: 3rem;
  margin-bottom: 3rem;
  padding-left: 0.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
    padding-right: unset;
  }

  & > canvas {
    border-radius: 50%;
  }
`;

export const InfoCard = styled.div`
  background: ${({ theme }) => theme.colors.greys[15]};
  border-radius: 1rem;
  padding: 0.875rem 1rem;
  color: ${({ theme }) => theme.colors.primary};
  border: ${({ theme }) => `1px solid ${theme.colors.primary}`};
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
  margin-bottom: 1rem;
`;

export const PoolContent = styled.div`
  max-height: calc(100vh - 22rem);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;
