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
  Label,
  InfoCard,
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
    onSubmitDetails,
    onSubmitRewards,
    onBackFromRewards,
    poolDetails,
    poolReward,
    fundAndActivate,
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
              <Label>
                Deposit {poolReward.minReward} {poolReward.tokenName} into the pool.
              </Label>
            </Box>
            <InfoCard>
              Once a pool is created, it is committed on-chain. This means the funds cannot be
              withdrawn, and the parameters of the pool cannot be altered. This is to ensure that
              Hype pools are transparent and fair to your community.
            </InfoCard>
            <FormAction>
              <Button
                disabled={!authenticated}
                size="full-width"
                type="submit"
                onClick={() => fundAndActivate()}
              >
                Fund & Activate the Pool
              </Button>
            </FormAction>
          </FormColumn>
          <HowItWorks step={currentStep} />
        </StepContent>
      )}
      {currentStep === 4 && (
        <>
          <Button size="regular" onClick={() => onFinalize()}>
            Finalize
          </Button>
        </>
      )}
    </Wrapper>
  );
};
