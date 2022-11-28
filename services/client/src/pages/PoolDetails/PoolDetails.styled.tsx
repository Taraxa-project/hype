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

export const CardSubheader = styled.div`
  display: flex;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.greys[7]};
  font-size: 0.875rem;
`;

export const CardDescription = styled.div`
  font-weight: 400;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.greys[7]};
  width: 100%;
  margin-bottom: 1rem;
  display: block;
  overflow: hidden;
`;

export const PoolContainer = styled.div`
  height: 100%;
  margin-top: 3rem;
  padding-left: 3rem;
  padding-right: 3rem;
`;
