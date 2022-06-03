import styled from 'styled-components';
import TitleText from 'src/components/TitleText/TitleText';
import Input from 'src/components/input/Input';
import Button from 'src/components/button/Button';

const Wrapper = styled.div`
  padding: 4.688rem 5rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

const FormColumn = styled.div`
  max-width: 29rem;
`;

const HowItWorksColumn = styled.div`
  max-width: 30.875rem;
`;

const HowItWorksWrapper = styled.div`
  background-color: #f1f1f1;
  border-radius: 1.5rem;
  padding: 1.5rem 2.25rem;
`;

const Example = styled.div`
  border-left: 0.188rem solid #15ac5b;
  padding-left: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #797979;
  margin-bottom: 1.5rem;
  max-width: 25rem;
`;

const Label = styled.div`
  color: #5c5c5c;
  margin-top: 1rem;
  margin-bottom: 0.75rem;
  font-weight: 700;
`;

const InfoCard = styled.div`
  background-color: #f1f1f1;
  border-radius: 1rem;
  padding: 0.875rem 1rem;
  /* hype_neutral/700 */
  color: #787878;
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-bottom: 2rem;
`;

const ConnectButton = styled(Button)`
  margin-top: 2rem;
`;

const HowItWorksTitle = styled(TitleText)`
  font-size: 1.25rem;
  line-height: 1.625rem;
  margin-top: 0;
`;

const Steps = styled.div`
  display: flex;
  flex-direction: column;
`;

const Step = styled.div`
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
    ); // We need to substract 0.25 from the top and bottom. So 0.5 rem total
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

const StepNumber = styled.div`
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

const StepDescription = styled.div`
  flex: 1 1 auto;
  margin-left: 1.625rem;
  display: flex;
  align-items: center;
  color: #787878;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const AddHypePool = () => {
  return (
    <Wrapper>
      <FormColumn>
        <TitleText>Give your pool a title!</TitleText>
        <Example>
          <b>Example:</b> Hype App Pool, Cool NFT
        </Example>
        <Label>Hype pool name:</Label>
        <Input placeholder="Pool name..." />
        <TitleText>What are you hyping?</TitleText>
        <InfoCard>
          Enter messages, keywords, links, whatever you want hyped up in social. Currently we only
          support Telegram. Need some ideas? Check out some other hype pools.
        </InfoCard>
        <Example>
          <b>Example:</b> Taraxa is launching Hype!, the first app on its social listening platform,
          powered by the Taraxa Layer-1 Network. Check it out at{' '}
          <a href="https://hype.taraxa.io">hype.taraxa.io</a>.
        </Example>
        <Label>What are you hyping?</Label>
        <Input placeholder="Your message..." />
        <TitleText>How do you want to reward verified hypes?</TitleText>
        <Label>Rewards are in:</Label>
        <Input placeholder="Asset address..." />
        <Label>Min reward per hype:</Label>
        <Input placeholder="Min reward per hype..." />
        <Label>Pool cap:</Label>
        <Input placeholder="Pool cap..." />
        <Label>Pool ends</Label>
        <Input placeholder="Pool ends..." />
        <ConnectButton size="full-width">Connect wallet</ConnectButton>
      </FormColumn>
      <HowItWorksColumn>
        <HowItWorksWrapper>
          <HowItWorksTitle>How it works</HowItWorksTitle>
          <Steps>
            <Step>
              <StepNumber>1</StepNumber>
              <StepDescription>Come up with a name for your hype pool.</StepDescription>
            </Step>
            <Step>
              <StepNumber>2</StepNumber>
              <StepDescription>
                Enter messages, keywords, links, whatever you want hyped up in social. Currently we
                only support Telegram. Need some ideas? Check out some other hype pools.
              </StepDescription>
            </Step>
            <Step>
              <StepNumber>3</StepNumber>
              <StepDescription>
                Enter asset address which has the rewards for the pool – currently supports ERC-20
                compatible assets. Then specify the minimum reward for hype. Learn more about
                verified hype here..
              </StepDescription>
            </Step>
          </Steps>
        </HowItWorksWrapper>
      </HowItWorksColumn>
    </Wrapper>
  );
};

export default AddHypePool;
