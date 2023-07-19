import logo from '../../assets/images/taraxa_logo.png';
import { StyledFooter, StyledTaraxaLogo } from './Footer.styled';

const Footer = () => {
  return (
    <StyledFooter>
      <div>&copy; 2023 GetHyped. All rights reserved.</div>
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
