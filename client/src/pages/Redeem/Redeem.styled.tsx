import styled from 'styled-components';
import { HypeThemeType } from '../../theme/HypeTheme';

export const RewardContainer = styled.div<{ theme: HypeThemeType }>`
  background: ${({ theme }) => theme.cards.lightCard.background};
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding: 2rem;
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  width: 100%;
`;

export const ColContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ToggleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const RewardTitle = styled.h2`
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.625rem;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: #000000;
`;

export const RewardContent = styled.div`
  padding-top: 2.813rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
