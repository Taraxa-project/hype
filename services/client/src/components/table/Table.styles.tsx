import styled from 'styled-components';
import { HypeThemeType } from '../../theme';

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const TableWrapper = styled.table<{ theme: HypeThemeType }>`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0px;
  width: 100%;
  color: ${({ theme }) => theme.colors.greys[7]};
  background: rgb(247, 247, 247);
`;

export const TableHeader = styled.th<{ theme: HypeThemeType }>`
  padding: 1rem;
  text-align: left;
  background-color: ${({ theme }) => theme.colors.greys[0]};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.greys[8]}`};
  color: ${({ theme }) => theme.colors.greys[7]};
`;

export const TableCell = styled.td<{ theme: HypeThemeType }>`
  padding: 1rem;
  text-align: left;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.greys[9]}`};
`;
