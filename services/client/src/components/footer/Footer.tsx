import styled from 'styled-components';
import logo from '../../assets/images/taraxa_logo.png';
import { HypeThemeType } from '../../theme';

export const StyledFooter = styled.footer<{ theme: HypeThemeType }>`
  width: ${({ theme }) => `calc(${theme.breakpoints.lg} - 30px)`};
  margin: 0 auto 1rem;
  padding: 1rem 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  box-sizing: border-box;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.greys[5]};

  > div > a {
    color: ${({ theme }) => theme.colors.greys[5]};
  }
`;

export const StyledTaraxaLogo = styled.div<{ theme: HypeThemeType }>`
  padding: 1.5rem;
  border-radius: 1rem;
  text-transform: uppercase;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    width: 300px;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div>
        &copy; 2023 GetHyped. All rights reserved.
      </div>
      <StyledTaraxaLogo>
        <p>Powered by</p>
        <img src={logo} alt="Taraxa" />
      </StyledTaraxaLogo>
      <div>
        <a href="/privacy-policy">Privacy Policy</a>
        {' | '}
        <a href="/terms-and-conditions">Terms and Conditions</a>
      </div>
    </StyledFooter>
  );
};

export default Footer;
