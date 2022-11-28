import React, { AnchorHTMLAttributes } from 'react';
import { StyledLink } from './Link.styled';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: 'string';
  text: string;
}

export const Link = (props: LinkProps) => (
  <StyledLink className={props.className} href={props.href} target={props.target}>
    {props.text}
  </StyledLink>
);
