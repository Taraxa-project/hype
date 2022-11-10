import TitleText from 'src/components/titletext/TitleText';
import { Link } from 'src/components/styles/Link';
import Button from '../../../components/button/Button';
import { ConnectWalletBtn } from '../../../components/connect-wallet-btn/ConnectWalletBtn';
import Text from '../../../components/styles/Text';

import {
  FormColumn,
  Example,
  Label,
  FormInput,
  InfoCard,
  FormAction,
  FormElement,
} from '../AddHypePool.styled';
import TextArea from '../../../components/textarea/TextArea';
import Box from '../../../components/styles/Box';
import { HypePoolDetailsForm, useDetailsFormEffects } from './DetailsForm.effects';

export interface DetailsFormProps {
  defaultValues: HypePoolDetailsForm;
  onSubmit: (data: HypePoolDetailsForm) => void;
}

export const DetailsForm = ({ defaultValues, onSubmit }: DetailsFormProps) => {
  const { register, handleSubmit, errors, authenticated } = useDetailsFormEffects(defaultValues);

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <FormColumn>
        {/* Title */}
        <FormElement>
          <TitleText>Give your pool a title!</TitleText>
          <Example>
            <b>Example:</b> Hype App Pool, Cool NFT
          </Example>
          <FormInput
            disabled={!authenticated}
            placeholder="Pool name..."
            name="title"
            {...register('title')}
          />
          {errors.title && (
            <Text color="danger" fontSize="0.8rem">
              {errors.title.message}
            </Text>
          )}
        </FormElement>

        {/* Project Name */}
        <FormElement>
          <TitleText>Tell us about your project</TitleText>
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>Project's name & potential variations separated by commas</Label>
            {/* <SpacedStyledTooltip message="Project name" /> */}
          </Box>
          <Example>
            <b>Example 1:</b> Taraxa <br />
            <b>Example 2:</b> Dragon War, Dragon Wars, DragonWar, DragonWars
          </Example>
          <FormInput
            disabled={!authenticated}
            placeholder="Project name..."
            name="projectName"
            {...register('projectName')}
          />
          {errors.projectName && (
            <Text color="danger" fontSize="0.8rem">
              {errors.projectName.message}
            </Text>
          )}
        </FormElement>

        {/* Token Name */}
        <FormElement>
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>Project's token name (if any): </Label>
          </Box>
          <Example>
            <b>Example:</b> TARA
          </Example>
          <FormInput
            disabled={!authenticated}
            placeholder="ex: TARA"
            name="tokenName"
            {...register('tokenName')}
          />
        </FormElement>

        {/* Description */}
        <FormElement>
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>Brief project description:</Label>
          </Box>
          <Example>
            A brief but comprehensive summary of your project, one that highlights all its unique
            aspects.
          </Example>
          <TextArea
            disabled={!authenticated}
            rows={12}
            maxLength={1000}
            placeholder="ex:  Taraxa is a purpose-built, fast, scalable, and device-friendly Layer-1 public ledger designed to help democratize reputation by making informal data trustworthy. 
                  &#13;&#10;
                  People and devices generate data constantly, but more than 80% of it is informal and cannot be tracked. Examples range from informal verbal agreements, IoT status signals, or casual online discussions. As a result, informal transactional and interactional data remains unstructured, unverifiable, and impossible to trust.
                  &#13;&#10;
                  Taraxa tracks informal data and makes it trustworthy with its purpose-built technologies, by decentralizing informal data gathering & analytics and enforcing accountability through signed commitments. With enough informal data, we can build localized reputation networks rooted in communities, enabling even most minor participants to acquire a reputation, becoming more trusted and efficiently rewarded.
                  "
            name="projectDescription"
            {...register('projectDescription')}
          />
          {errors.projectDescription && (
            <Text color="danger" fontSize="0.8rem">
              {errors.projectDescription.message}
            </Text>
          )}
        </FormElement>

        {/* Hype Description */}
        <FormElement>
          <TitleText>What are you hyping?</TitleText>
          <InfoCard>
            Enter messages, keywords, links, whatever you want hyped up in social. Currently we only
            support Telegram. Need some ideas? Check out some other
            <Link text="hype pools" href={'/'} />.
          </InfoCard>
          <Example>
            Your project's latest news that crypto community should know about, e.g., the latest
            Tweet about your project's product launch.
          </Example>
          <TextArea
            disabled={!authenticated}
            maxLength={280}
            rows={12}
            placeholder="Taraxa's Hype app just launched! Come check it out at: https://hype.taraxa.io. 
                &#13;&#10;  
                Drop by if you want to, 
                &#13;&#10;  
                - Help your project raise awareness in crypto communities&#13;&#10;  
                - Earn rewards for helping to spread the word and engage others in meaningful discussions about your favorite project&#13;&#10;  
                - Block out the bots & bounty hunters ruining your social campaigns & communities&#13;&#10;
                … 
                "
            name="description"
            {...register('description')}
          />
          {errors.description && (
            <Text color="danger" fontSize="0.8rem">
              {errors.description.message}
            </Text>
          )}
        </FormElement>

        {/* Hype Word */}
        <FormElement>
          <Box display="flex" flexDirection="row" gridGap="0.2rem" alignItems="center">
            <Label>Give us one word that best defines this hype:</Label>
          </Box>
          <Example>
            <b>Example:</b> someone hyping Taraxa's testnet launch must include the word “testnet“
            in their social message.
          </Example>
          <FormInput
            disabled={!authenticated}
            placeholder="ex: testnet"
            name="word"
            {...register('word')}
          />
          {errors.word && (
            <Text color="danger" fontSize="0.8rem">
              {errors.word.message}
            </Text>
          )}
        </FormElement>

        {authenticated ? (
          <div>
            <FormAction>
              <Button size="full-width" type="submit" variant="primary">
                Next: Hype Pool Rewards ➡️
              </Button>
            </FormAction>
          </div>
        ) : (
          <ConnectWalletBtn mt="4" size="full-width" />
        )}
      </FormColumn>
    </form>
  );
};
