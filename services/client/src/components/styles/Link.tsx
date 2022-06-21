import React, { AnchorHTMLAttributes } from 'react';
import { StyledLink } from './Link.styled';


interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    text: string;
}


export const Link = (props: LinkProps) => (
    <StyledLink href={props.href}>
        {props.text}
    </StyledLink>
)