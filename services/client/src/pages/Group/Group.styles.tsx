import styled from 'styled-components';

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: start;
    justify-content: start;
  }
`;

export const GroupSearch = styled.div`
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

export const GroupContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 1rem;
  padding-left: 3rem;
  padding-right: 3rem;
  margin-bottom: 1rem;
  overflow: auto;
  gap: 1rem;
`;
