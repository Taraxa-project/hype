import styled from 'styled-components';
import { HypeThemeType } from '../../theme/HypeTheme';

export const TransactionContainer = styled.div`
  background: #f1f1f1;
  border-radius: 16px;
  padding: 1.313rem;
  display: flex;
  flex-direction: column;
`;

export const TransactionHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TransactionRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TransactionColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TransactionContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TransactionValue = styled.h1<{ theme: HypeThemeType; type: 'positive' | 'negative' }>`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  color: ${({ theme, type }) =>
    type === 'positive' ? theme.colors.success : theme.colors.primary};
`;

export const TransactionDate = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #808080;
  margin: 0;
`;

export const TransactionText = styled.p<{ isBold: boolean }>`
  font-style: normal;
  font-weight: ${(props) => (props.isBold === true ? '700' : '400')};
  font-size: 14px;
  line-height: 20px;
  color: #595959;
  margin: 0.1rem;
`;
