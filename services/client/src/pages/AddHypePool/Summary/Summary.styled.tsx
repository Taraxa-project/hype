import styled from 'styled-components';

export const Account = styled.div`
  background: #ececec;
  border-radius: 1.625rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.greys[11]};
  padding: 0.375rem 1.5rem;
  margin-left: 1rem;
  word-break: break-word;
`;

export const BlockiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-left: 0.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
    padding-right: unset;
  }

  & > canvas {
    border-radius: 50%;
  }
`;

export const PoolContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  padding-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-left: 0.5rem;
  }
`;

export const RewardContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
