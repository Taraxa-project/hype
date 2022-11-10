import TitleText from 'src/components/titletext/TitleText';
import Button from '../../components/button/Button';
import { useAddHypePoolEffects } from './AddHypePool.effects';
import 'react-datepicker/dist/react-datepicker.css';

import {
  Wrapper,
  FormColumn,
  Steps,
  Step,
  StepTitle,
  StepContent,
  FormAction,
  StepSubTitle,
} from './AddHypePool.styled';
import Box from '../../components/styles/Box';
import { HowItWorks } from '../../components/how-it-works/HowItWorks';
import { DetailsForm } from './DetailsForm';
import { RewardForm } from './RewardForm';

export const AddHypePool = () => {
  const {
    authenticated,
    onFinalize,
    currentStep,
    setCurrentStep,
    onSubmitDetails,
    onSubmitRewards,
    onBackFromRewards,
    poolDetails,
    poolReward,
  } = useAddHypePoolEffects();

  return (
    <Wrapper>
      <Steps>
        <Step>
          <StepTitle active={currentStep > 1}>➕</StepTitle>
          <StepSubTitle active={currentStep > 1}>WHAT are you Hyping?</StepSubTitle>
        </Step>
        <Step>
          <StepTitle active={currentStep > 2}>💲</StepTitle>
          <StepSubTitle active={currentStep > 2}>HOW will you reward?</StepSubTitle>
        </Step>
        <Step>
          <StepTitle active={currentStep > 3}>📣</StepTitle>
          <StepSubTitle active={currentStep > 3}>START Hyping!</StepSubTitle>
        </Step>
      </Steps>

      {currentStep === 1 && (
        <StepContent>
          <DetailsForm defaultValues={poolDetails} onSubmit={onSubmitDetails} />
          <HowItWorks step={currentStep} />
        </StepContent>
      )}

      {currentStep === 2 && (
        <>
          <StepContent>
            <RewardForm
              defaultValues={poolReward}
              onSubmit={onSubmitRewards}
              onBack={onBackFromRewards}
            />
            <HowItWorks step={currentStep} />
          </StepContent>
        </>
      )}
      {currentStep === 3 && (
        <StepContent>
          <FormColumn>
            <TitleText>Fund and activate the Hype Pool!</TitleText>
            <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
              {/* <Label>
                Deposit {getValues('minReward')} {getValues('token')} into the pool.
              </Label> */}
            </Box>
            <FormAction>
              <Button size="full-width" type="submit" onClick={() => setCurrentStep(4)}>
                Next
              </Button>
            </FormAction>
          </FormColumn>
          <HowItWorks step={currentStep} />
        </StepContent>
      )}
      {currentStep === 4 && (
        <>
          <Button size="regular" onClick={() => setCurrentStep(1)}>
            Finalize
          </Button>
        </>
      )}
    </Wrapper>
  );
};
