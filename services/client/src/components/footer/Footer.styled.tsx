import styled from 'styled-components';

export const StyledFooter = styled.footer`
  width: 100%;
  padding: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.85rem;
  width: 100%;
  box-sizing: border-box;
`;

export const StyledTaraxaLogo = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
`;
