import { useAddHypePoolEffects } from './AddHypePool.effects';
import 'react-datepicker/dist/react-datepicker.css';

import { Wrapper, Steps, Step, StepTitle, StepContent, StepSubTitle } from './AddHypePool.styled';
import { HowItWorks } from '../../components/how-it-works/HowItWorks';
import { DetailsForm } from './DetailsForm';
import { RewardForm } from './RewardForm';
import { Summary } from './Summary';
import { Completed } from './Completed';
import { BigNumber } from 'ethers';

export const AddHypePool = () => {
  const {
    currentStep,
    onSubmitDetails,
    onSubmitRewards,
    onBackFromRewards,
    poolDetails,
    poolReward,
    successCallbackActivatePool,
    createdPoolIndex,
    isCustomToken,
    setIsCustomToken,
    poolTransaction,
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
              setIsCustomToken={setIsCustomToken}
            />
            <HowItWorks step={currentStep} />
          </StepContent>
        </>
      )}
      {currentStep === 3 && (
        <StepContent>
          <Summary
            createdPoolIndex={createdPoolIndex}
            details={poolDetails}
            rewards={poolReward}
            successCallbackActivatePool={successCallbackActivatePool}
            isCustomToken={isCustomToken}
          />
          <HowItWorks step={currentStep} />
        </StepContent>
      )}
      {currentStep === 4 &&
        createdPoolIndex &&
        poolTransaction &&
        poolDetails?.title &&
        poolReward?.network && (
          <StepContent>
            <Completed
              createdPoolIndex={createdPoolIndex}
              transaction={poolTransaction}
              poolName={poolDetails?.title}
              network={poolReward?.network}
            />
          </StepContent>
        )}
    </Wrapper>
  );
};
