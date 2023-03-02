import styled from 'styled-components';
import ReactPlayer from 'react-player';

export const Logo = styled.div`
  font-size: 5rem;
  display: flex;
`;

export const CardContainer = styled.div`
  position: relative;
  z-index: 1;
  overflow: auto;
  padding: 0 3rem 2rem;
  margin-top: 2rem;
  margin-bottom: 1rem;

  display: grid;
  gap: 2rem;
  // grid-template-columns: repeat(auto-fill, minmax(21rem, max-content));
  grid-template-columns: repeat(auto-fill, minmax(21rem, max-content));
  justify-content: start;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: 0 1rem;
  }
`;

export const PageContainer = styled.div`
  background: #fafafa;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const HeroContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 3rem;
  padding-left: 3rem;
  padding-right: 3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    margin-top: 2.5rem;
    padding: 0 1.5rem;
  }
`;

export const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  justify-content: center;
`;

export const VideoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: right;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const VideoPlayer = styled(ReactPlayer)`
  width: 29.625rem;
  height: 16.75rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
  }
`;

export const PoolContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.5rem;
  padding-left: 3rem;
  padding-right: 3rem;

  @media (max-width: 768px) {
    margin-top: 1rem;
    padding: 0 1.5rem;
  }
`;

export const NotFoundContainer = styled.div`
  min-height: 12rem;
  margin: 2rem 3rem;
  background: #f1f1f1;
  border-radius: 1rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: 2rem 1.5rem;
  }
`;

export const NotFoundText = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 0.8rem;
  line-height: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  letter-spacing: -0.03em;
  color: #a6a6a6;
`;

export const DescriptionContainer = styled.span`
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: -0.02em;
  text-align: left;
  color: #595959;
  max-width: 22rem;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: unset;
    margin-bottom: 2.625rem;
  }
`;

export const LogoText = styled.h1`
  font-weight: 600;
  font-size: 2rem;
  line-height: 1.625rem;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: #000000;
  margin-left: 0.5rem;
`;

export const TitleText = styled.h3`
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 1.625rem;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: #000000;
`;

export const LoadingContainer = styled.footer`
  position: absolute;
  bottom: 0;
`;
