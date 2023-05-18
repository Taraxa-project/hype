import { TableCell, TableContainer, TableHeader, TableWrapper } from './Table.styles';

export interface TableProps {
  columns: { path: string; name: string }[];
  rows: {
    data: any[];
  }[];
}

const Table = ({ columns, rows }: TableProps) => {
  return (
    <TableContainer>
      <TableWrapper>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <TableHeader key={index}>{column.name}</TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.data.map((data: any) =>
                columns.map(({ path }, j) => (
                  <TableCell key={`${index}-${j}`}>{data[path]}</TableCell>
                )),
              )}
            </tr>
          ))}
        </tbody>
      </TableWrapper>
    </TableContainer>
  );
};

export default Table;
