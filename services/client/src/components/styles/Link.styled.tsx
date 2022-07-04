import styled from 'styled-components';
import { HypeThemeType } from 'src/theme';

export const StyledLink = styled.a<{ theme: HypeThemeType }>`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.info};
  line-height: 1.875rem;
  text-decoration: none;
  letter-spacing: -0.02em;
`;
