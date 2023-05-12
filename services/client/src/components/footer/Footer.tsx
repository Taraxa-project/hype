import React from 'react';
import { StyledFooter, StyledTaraxaLogo } from './Footer.styled';
import logo from '../../assets/images/taraxa_logo.png';

const Footer = () => {
  return (
    <StyledFooter>
      Powered by{' '}
      <StyledTaraxaLogo>
        <img src={logo} alt="Taraxa" height={30} />
      </StyledTaraxaLogo>
    </StyledFooter>
  );
};

export default Footer;
