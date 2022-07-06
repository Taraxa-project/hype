import Input from 'src/components/input/Input';
import TitleText from 'src/components/TitleText/TitleText';
import Tooltip from 'src/components/tooltip/Tooltip';

import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 4.688rem 5rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 1rem 2rem 2rem;
  }
`;

export const FormColumn = styled.div`
  max-width: 29rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
  }
`;

export const FormInput = styled(Input)`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
  }
`;

export const HowItWorksColumn = styled.div`
  max-width: 30.875rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

export const HowItWorksWrapper = styled.div`
  background-color: #f1f1f1;
  border-radius: 1.5rem;
  padding: 1.5rem 2.25rem;
`;

export const Example = styled.div`
  border-left: 0.188rem solid #15ac5b;
  padding-left: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #797979;
  margin-bottom: 1.5rem;
  max-width: 25rem;
`;

export const Label = styled.div`
  color: #5c5c5c;
  margin-top: 1rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

export const InfoCard = styled.div`
  background-color: #f1f1f1;
  border-radius: 1rem;
  padding: 0.875rem 1rem;
  color: #787878;
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-bottom: 2rem;
`;

export const HowItWorksTitle = styled(TitleText)`
  font-size: 1.25rem;
  line-height: 1.625rem;
  margin-top: 0;
`;

export const Steps = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Step = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
  position: relative;

  ::after {
    content: '';
    display: block;
    position: absolute;
    top: 2.25rem;
    left: 1rem;
    height: calc(
      100% - 0.5rem
    ); /* We need to substract 0.25 from the top and bottom. So 0.5 rem total */
    width: 0.063rem;
    background-color: #dadada;
  }

  :last-child {
    ::after {
      content: none;
    }

    margin-bottom: 0;
  }
`;

export const StepNumber = styled.div`
  flex: 0 1 auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  width: 2rem;
  height: 2rem;
  background-color: #e0e0e0;
  color: #797979;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

export const StepDescription = styled.div`
  flex: 1 1 auto;
  margin-left: 1.625rem;
  display: flex;
  align-items: center;
  color: #787878;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

export const FormAction = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

export const SpacedStyledTooltip = styled(Tooltip)`
  margin-left: 0.625rem;
`;
