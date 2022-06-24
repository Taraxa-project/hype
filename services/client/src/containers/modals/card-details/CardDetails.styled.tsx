import styled from 'styled-components';

export const Account = styled.div`
  background: #ececec;
  border-radius: 1.625rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  color: #787878;
  padding: 0.375rem 1.5rem;
  margin-left: 2rem;
  word-break: break-word;
`;

export const BlockiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  padding-right: 3rem;
  margin-bottom: 2rem;
  padding-left: 0.5rem;
  @media (max-width: 768px) {
    flex-direction: row;
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
  color: #595959;
  width: 100%;
  margin-bottom: 2rem;
  display: block;
  overflow: hidden;
`;
