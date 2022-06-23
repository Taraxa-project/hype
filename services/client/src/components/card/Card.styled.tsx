import styled from 'styled-components';
import { HypeThemeType } from '../../theme';

interface CustomStyledProps {
  variant?: 'mobile' | 'desktop';
  theme?: HypeThemeType;
}

export const StyledCard = styled.div<CustomStyledProps>`
  width: ${({variant}) => (variant === 'mobile' ? 'auto' : '23rem')};
  height: ${({variant}) => (variant === 'mobile' ? '21.938rem' : '24.438rem')};
  line-height: 1.25rem;
  display: flex;
  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.greys[0]};
  padding: 1%;
  margin-top: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 2rem;
  flex-grow: 1;
  max-width: 28rem;
`;

export const CardTitle = styled.h3`
  font-weight: 700;
  font-size: 0.875rem;
  color: #292929;
  width: 100%;
`;

export const CardDescription = styled.span`
  font-weight: 400;
  font-size: 0.875rem;
  color: #595959;
  width: 100%;
  min-height: 2rem;
  margin-bottom: 2%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const DataHeader = styled.span`
  width: 50%;
  align-items: left !important;
  font-weight: 700;
`;

export const DataValue = styled.span<{ theme: HypeThemeType }>`
  width: 50%;
  align-items: left !important;
  font-weight: 400;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

export const DataContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
