import styled from 'styled-components';

export const HeroContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  justify-content: space-between;
  margin-top: 3rem;
  padding-left: 3rem;
  padding-right: 3rem;
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
  @media (max-width: 768px) {
    flex-direction: column;
  }
  align-items: right;
`;

export const PoolContainer = styled.div`
  display: flex;
  flex-direction: inherit;
  margin-top: 3rem;
  padding-left: 3rem;
  padding-right: 3rem;
`;

export const NotFoundContainer = styled.div`
  min-height: 12rem;
  margin: 2rem 3rem 2rem;
  background: #f1f1f1;
  border-radius: 1rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`;

export const NotFoundText = styled.span`
  font-family: 'Inter';
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
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-width: 15rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TitleText = styled.h3`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.625rem;

  display: flex;
  align-items: center;
  letter-spacing: -0.02em;

  color: #000000;
`;
