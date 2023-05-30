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
`;

export const GroupContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  overflow: auto;
  gap: 1rem;
`;
