import styled from 'styled-components';
import { HypeThemeType } from '../../theme';

export const PoolTitle = styled.h3`
  font-weight: 700;
  font-size: 2rem;
  color: #292929;
  margin-bottom: 1.25rem;
  width: 100%;
`;

export const Account = styled.div`
  background: #ececec;
  border-radius: 1.625rem;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.greys[11]};
  padding: 0.5rem 1.5rem;
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

export const Subheader = styled.div`
  display: flex;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.greys[7]};
  font-size: 1rem;
`;

export const Description = styled.div`
  font-weight: 400;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.greys[7]};
  width: 100%;
  margin-bottom: 1rem;
  display: block;
  overflow: hidden;
`;

export const PoolContainer = styled.div`
  height: 100%;
  margin-top: 3rem;
  margin-bottom: 3rem;
  padding-left: 3rem;
  padding-right: 3rem;
`;

export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const InfoHeader = styled.span`
  flex: 1 0 50%;
  display: flex;
  text-align: right;
  font-weight: 700;
  line-height: 1.25rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.greys[7]};
`;

export const InfoValue = styled.span<{ theme: HypeThemeType }>`
  flex: 1 0 50%;
  display: flex;
  font-weight: 400;
  font-size: 1rem;
  justify-content: end;
  color: ${({ theme }) => theme.colors.greys[7]};
`;
