import styled from 'styled-components';
import { HypeThemeType } from '../../../theme';

export const StyledModal = styled.div<{ theme: HypeThemeType }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden; /* Enable scroll if needed */
  z-index: 1040;
  backdrop-filter: blur(1rem);

  max-width: 586px;
  min-width: 486px;

  min-height: 550px;
  background: ${({ theme }) => theme.colors.greys[1]};
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;
  padding: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 70%;
    max-width: unset;
    min-width: unset;
  }
`;
