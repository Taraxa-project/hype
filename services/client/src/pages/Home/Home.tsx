import SearchIcon from '../../assets/icons/Search';
import Megaphone from '../../assets/images/megaphone.png';
import Input from '../../components/input/Input';
import Image from '../../components/image/Image';
import LoadingSpinner from '../../assets/icons/Spinner';
import NotFoundIcon from '../../assets/icons/NotFound';
import { useHomeEffects } from './Home.effects';
import {
  HeroContainer,
  IntroContainer,
  TitleText,
  DescriptionContainer,
  GuideContainer,
  PoolContainer,
  NotFoundContainer,
  NotFoundText,
  CardContainer,
  Logo,
  LogoText,
  TelegramInfoContainer,
  TelegramButtonsContainer,
  TelegramDetails,
  Guide,
} from './Home.styled';
import Card from '../../components/card/Card';
import Box from '../../components/styles/Box';
import { HypePool } from '../../models';
import Button from '../../components/button/Button';
import walkthrough from '../../assets/images/walkthrough.png';

export const Home = () => {
  const {
    debouncedResults,
    hypePools,
    onClick,
    isFetchingNextPage,
    onlistTelegram,
    onSubmitTelegram,
  } = useHomeEffects();

  return (
    <>
      <HeroContainer>
        <IntroContainer>
          <Logo>
            <Image width="auto" height="50px" src={Megaphone} alt="Megaphone" />
            <LogoText style={{ margin: '0 0 0 1rem' }}>Hype</LogoText>
          </Logo>
          <TitleText>Automated Social Campaigns for Web3</TitleText>
          <DescriptionContainer>
            Hype your project and expand your community with automated social campaigns with
            measurable + verifiable outcomes, spam-filtering, and reward. Decentralized,
            open-source, and transparent.
          </DescriptionContainer>
        </IntroContainer>
        <GuideContainer href="https://docs.taraxa.io/social-listening/hype-app" target="_blank" >
          <Guide src={walkthrough} alt="Hype! app Guide" />
        </GuideContainer>
      </HeroContainer>
      <TelegramInfoContainer>
        <TelegramDetails>
          <TitleText>Make sure Telegram groups you`re in are indexed!</TitleText>
          <DescriptionContainer>
            To be rewarded, the groups where you`re hyping in must be indexed. Please check to see
            if the crypto Telegram groups you frequent are indexed, if they`re not, submit them to
            us and we`ll add them to the list.
          </DescriptionContainer>
        </TelegramDetails>
        <TelegramButtonsContainer>
          <Button variant="secondary" onClick={onlistTelegram}>
            📋 List of Indexed Telegram Groups
          </Button>
          <Button onClick={onSubmitTelegram}>⬆ Submit a New Telegram Group</Button>
        </TelegramButtonsContainer>
      </TelegramInfoContainer>
      <PoolContainer>
        <TitleText>Active Hype Pools</TitleText>
        <Input
          icon={<SearchIcon />}
          placeholder="Search for hype pools..."
          onChange={debouncedResults}
        />
      </PoolContainer>
      {hypePools.length > 0 && (
        <CardContainer>
          {hypePools.map(
            (data: HypePool, i: number) =>
              data && (
                <Card key={`${data?.title}-${i}`} pool={data} onClick={() => onClick(data)} />
              ),
          )}
        </CardContainer>
      )}
      {isFetchingNextPage && (
        <Box display="flex" justifyContent="center" alignItems="center" my={3}>
          <LoadingSpinner />
        </Box>
      )}
      {(!hypePools || hypePools.length === 0) && (
        <NotFoundContainer>
          <NotFoundText>
            <NotFoundIcon /> Nothing found...
          </NotFoundText>
        </NotFoundContainer>
      )}
    </>
  );
};
