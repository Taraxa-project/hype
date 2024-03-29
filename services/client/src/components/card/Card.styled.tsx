import styled from 'styled-components';
import { HypeThemeType } from '../../theme';

interface CustomStyledProps {
  theme?: HypeThemeType;
}

export const StyledCard = styled.div<CustomStyledProps>`
  max-width: 23rem;
  height: 24.438rem;
  line-height: 1.25rem;
  display: flex;
  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.greys[0]};
  padding: 1.5rem;
  box-sizing: border-box;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.7rem;
  }
`;

export const CardTitle = styled.h3`
  font-weight: 700;
  font-size: 1rem;
  color: #292929;
  margin-bottom: 1.25rem;
  width: 100%;
`;

export const CardDescription = styled.span`
  font-weight: 400;
  font-size: 0.875rem;
  color: #595959;
  width: 100%;
  margin-bottom: 1.5rem;
  display: block;
`;

export const DataHeader = styled.span`
  flex: 1 0 50%;
  display: flex;
  text-align: left;
  font-weight: 700;
  line-height: 1.25rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.greys[7]};
`;

export const DataValue = styled.span<{ theme: HypeThemeType }>`
  flex: 1 0 50%;
  display: flex;
  font-weight: 400;
  font-size: 0.875rem;
  justify-content: end;
  text-align: end;
  color: ${({ theme }) => theme.colors.greys[7]};
`;

export const DataContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 0.375rem;
  margin-bottom: 0.375rem;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
