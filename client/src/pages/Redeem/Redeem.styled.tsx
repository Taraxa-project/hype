import styled from 'styled-components';
import { HypeThemeType } from '../../theme/HypeTheme';

export const RewardContainer = styled.div<{ theme: HypeThemeType }>`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding: 2rem;
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
