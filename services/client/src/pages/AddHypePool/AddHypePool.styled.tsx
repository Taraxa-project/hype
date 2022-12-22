import styled from 'styled-components';
import Input from 'src/components/input/Input';
import Tooltip from 'src/components/tooltip/Tooltip';
import Select from '../../components/select/Select';

export const Wrapper = styled.div`
  padding: 5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
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

export const FormElement = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const FormInput = styled(Input)`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
  }
`;

export const FormSelect = styled(Select)`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
  }
`;

export const Example = styled.div`
  border-left: 0.188rem solid #15ac5b;
  padding-left: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #797979;
  margin-bottom: 1rem;
  max-width: 25rem;
  font-style: italic;
`;

export const Label = styled.div`
  color: #5c5c5c;
  margin-top: 1rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

export const Steps = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  max-width: 40rem;
`;

export const Step = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;

  ::after {
    content: '';
    display: block;
    position: absolute;
    top: 1rem;
    left: 3rem;
    height: 0.063rem;
    width: calc(100% - 4rem);
    background-color: #dadada;
  }

  :last-child {
    margin-right: 0;
    width: auto !important;
    min-width: 6rem;
    ::after {
      content: none;
    }

    margin-bottom: 0;
  }
`;

export const StepTitle = styled.div<{
  active: boolean;
}>`
  flex: 0 1 auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  width: 2rem;
  height: 2rem;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.secondary};
  color: ${({ theme }) => theme.colors.greys[14]};
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

export const StepSubTitle = styled.div<{
  active: boolean;
}>`
  color: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.greys[14])}};
  font-size: 0.875rem;
  line-height: 1.25rem;
  max-width: 6rem;
  margin-top: 1rem;
  text-align: center;
  margin-left: -1.5rem;
  :last-child {
    max-width: 6.2rem;
  }
`;

export const StepContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 4rem;
`;

export const FormAction = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

export const SpacedStyledTooltip = styled(Tooltip)`
  margin-left: 0.625rem;
`;

export const InfoCard = styled.div`
  background: ${({ theme }) => theme.colors.greys[15]};
  border-radius: 1rem;
  padding: 0.875rem 1rem;
  color: ${({ theme }) => theme.colors.primary};
  border: ${({ theme }) => `1px solid ${theme.colors.primary}`};
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
