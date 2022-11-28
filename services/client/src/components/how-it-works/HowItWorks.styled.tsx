import TitleText from 'src/components/titletext/TitleText';
import styled from 'styled-components';

export const HowItWorksColumn = styled.div`
  max-width: 25rem;

  @media (max-width: 1020px) {
    display: none;
  }
`;

export const HowItWorksWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.greys[0]};
  border-radius: 1.5rem;
  padding: 1.5rem 2.25rem;
`;

export const HowItWorksTitle = styled(TitleText)`
  font-size: 1.25rem;
  line-height: 1.625rem;
  margin-top: 0;
`;

export const HowItWorksDescription = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: start;
  color: ${({ theme }) => theme.colors.greys[11]};
  font-size: 0.875rem;
  line-height: 1.25rem;
`;
