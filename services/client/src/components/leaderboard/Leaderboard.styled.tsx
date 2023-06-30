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
  max-width: 1000px;
  margin: auto;
  border-collapse: collapse;
`;

export const StyledRow = styled.tr``;
