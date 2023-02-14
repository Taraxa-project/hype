import React from 'react';
import { ImageStyled } from './Image.styled';

export interface ImageProps {
  width?: string;
  height?: string;
  src: string;
  alt: string;
}

const Image = ({ width, height, src, alt }: ImageProps) => {
  return <ImageStyled width={width} height={height} src={src} alt={alt} />;
};

Image.defaultProps = {};

export default Image;
