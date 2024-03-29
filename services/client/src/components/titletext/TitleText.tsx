import styled from 'styled-components';

export default styled.h3`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.625rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 1rem;
  margin-top: 1.5rem;
`;