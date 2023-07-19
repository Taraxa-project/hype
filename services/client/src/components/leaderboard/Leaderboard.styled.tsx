import styled, { ThemedStyledProps } from 'styled-components';

interface CellProps {
  rank?: number;
}

type StyledCellProps = ThemedStyledProps<CellProps, any>;

export const StyledCell = styled.td<StyledCellProps>`
  padding: 10px;
  text-align: left;
  width: ${(props) => props.width || 'auto'};
`;

export const StyledTable = styled.table`
  width: 100%;
  margin: auto;
  border-collapse: collapse;
  table-layout: fixed;
  min-width: 500px;
`;

export const TableContainer = styled.div`
  overflow-x: auto;
  width: 100%;
`

export const StyledRow = styled.tr``;
