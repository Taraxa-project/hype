import React from 'react';
import {
  HowItWorksColumn,
  HowItWorksWrapper,
  HowItWorksTitle,
  HowItWorksDescription,
} from './HowItWorks.styled';

export interface HowItWorksProps {
  step: number;
}

export const HowItWorks = ({ step }: HowItWorksProps) => {
  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <>
            <HowItWorksTitle>How to describe what you're hyping:</HowItWorksTitle>
            <HowItWorksDescription>
              <p>
                Tell the app what you’re hyping, and it'll do the rest, automatically and
                transparently.
              </p>
              <p>
                All the information asked here are content you should already have. Typically, a
                project should already have a name, a brief description, and an announcement for a
                milestone you want to hype. Just copy/paste these in and the algorithm will handle
                the rest.
              </p>
              <p>Building is hard, hyping shouldn't be =)</p>
            </HowItWorksDescription>
          </>
        );
      case 2:
        return (
          <>
            <HowItWorksTitle>How to define rewards:</HowItWorksTitle>
            <HowItWorksDescription>
              <p>
                This step defines how you'll reward your community members for participating in the
                Hype Pool.
              </p>
              <p>
                You'll need to define the reward token, which blockchain network it's on, how much
                you're rewarding them, maximum size of the pool, and how long the pool lasts.
              </p>
            </HowItWorksDescription>
          </>
        );
      case 3:
        return (
          <>
            <HowItWorksTitle>How to activate the Hype Pool:</HowItWorksTitle>
            <HowItWorksDescription>
              <p>
                This is the last step, simply fund the Hype Pool with the rewards defined and then
                click on 'Activate'!
              </p>
            </HowItWorksDescription>
          </>
        );
    }
  };

  return (
    <HowItWorksColumn>
      <HowItWorksWrapper>{renderStep(step)}</HowItWorksWrapper>
    </HowItWorksColumn>
  );
};
