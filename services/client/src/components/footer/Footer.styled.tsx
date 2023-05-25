import styled from 'styled-components';
import { HypeThemeType } from '../../theme';

export const StyledFooter = styled.footer<{ theme: HypeThemeType }>`
  width: ${({ theme }) => `calc(${theme.breakpoints.lg} - 30px)`};
  margin: 0 auto 1rem;
  padding: 1rem 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  box-sizing: border-box;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.greys[5]};

  > div > a {
    color: ${({ theme }) => theme.colors.greys[5]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

export const StyledTaraxaLogo = styled.div<{ theme: HypeThemeType }>`
  padding: 1.5rem;
  border-radius: 1rem;
  text-transform: uppercase;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    width: 300px;
  }
`;
