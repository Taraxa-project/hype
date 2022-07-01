import styled from 'styled-components';
import { HypeThemeType } from '../../../theme';

export const StyledModal = styled.div<{ theme: HypeThemeType }>`
  position: fixed;
  left: 50%;
  top: 50%;
  overflow: auto; /* Enable scroll if needed */
  transform: translate(-50%, -50%);
  z-index: 1040;
  backdrop-filter: blur(1rem);
  width: auto;
  max-width: 500px !important;
  height: 60%;
  background: ${({ theme }) => theme.colors.greys[1]};
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;
  padding: 2rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-width: 400px;
  }
`;
