import React from 'react';
import styled from 'styled-components';
import {  HypeThemeType } from 'src/theme/types'


 const StyledLink = styled.a<{  theme: HypeThemeType }>`
    cursor: pointer;
    color: ${({ theme }) => theme.colors.info};
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