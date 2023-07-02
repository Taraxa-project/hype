import styled from 'styled-components';
import { HypeThemeType } from '../../theme';

export const Subheader = styled.div`
  display: flex;
  font-weight: 700;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
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

export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const InfoHeader = styled.span`
  width: 230px;
  text-align: left;
  font-weight: 700;
  line-height: 1.25rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.greys[7]};
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: auto;
  }
`;

export const InfoValue = styled.span<{ theme: HypeThemeType }>`
  font-weight: 400;
  font-size: 1rem;
  justify-content: end;
  color: ${({ theme }) => theme.colors.greys[7]};
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 10px;
  }
`;

export const AddressValue = styled.p`
  margin: 0;
  word-break: break-all;
  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const PoolImage = styled.img`
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
`;

export const PoolContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const PoolTitle = styled.h1`
  font-weight: 700;
  font-size: 3rem;
  margin-top: 1rem;
`;

export const PoolDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const KeywordWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: start;
  }
`;

export const Keyword = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 9999px;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 500;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: start;
  }
`;

export const ListItem = styled.li`
  margin-right: 10px;
  &:not(:last-child)::after {
    content: '•';
    margin-left: 10px;
  }
`;

export const CategoryTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const Stats = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
`;
