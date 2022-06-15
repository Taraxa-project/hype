import React from 'react';
import styled from 'styled-components';


 const StyledLink = styled.a`
    cursor: pointer;
    color: #0081CA;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.875rem;
    text-decoration: none;
    letter-spacing: -0.02em;
`

export const Link = (props: {text: string, target: string}) => (
    <StyledLink href={props.target}>
        {props.text}
    </StyledLink>
)