import React from 'react';
import { StyledFooter, StyledTaraxaLogo } from './Footer.styled';
import logo from '../../assets/images/logo.svg';

const Footer = () => {
  return (
    <StyledFooter>
      Powered by{' '}
      <StyledTaraxaLogo>
        <img src={logo} alt="Taraxa" />
      </StyledTaraxaLogo>
    </StyledFooter>
  );
};

export default Footer;
