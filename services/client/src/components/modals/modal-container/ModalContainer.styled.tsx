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

  max-width: 36rem;
  min-width: 30rem;
  height: auto;

  maxheight: 100vh;

  background: ${({ theme }) => theme.colors.greys[1]};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;
  padding: 2.7rem;

  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 70%;
    height: auto;
    min-height: 17rem;
    max-width: unset;
    min-width: unset;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    width: 70%;
    height: auto;
    min-height: 17rem;
    max-width: unset;
    min-width: unset;
  }
`;
