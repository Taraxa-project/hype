import styled from 'styled-components';
import { HypeThemeType } from '../../theme';

export const StyledGroup = styled.div<{ theme: HypeThemeType }>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.greys[0]};
  > * {
    flex: 1;
  }
  > *:nth-child(2) {
    flex: 0 0 45%;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: 1rem;
    > * {
      width: 100%;
    }
  }
`;
