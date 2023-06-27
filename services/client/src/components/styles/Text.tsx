import styled from 'styled-components';
import {
  space,
  width,
  color,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  typography,
  FontSizeProps,
  FontWeightProps,
  LineHeightProps,
  ColorProps,
  SpaceProps,
  WidthProps,
  LetterSpacingProps,
  TypographyProps,
} from 'styled-system';

export type TextProps = SpaceProps &
  FontSizeProps &
  FontWeightProps &
  LineHeightProps &
  ColorProps &
  LetterSpacingProps &
  WidthProps &
  TypographyProps;

const Text = styled.p<TextProps>`
  ${space}
  ${width}
  ${fontSize}
  ${fontWeight}
  ${lineHeight}
  ${color}
  ${letterSpacing}
  ${typography}
`;

Text.defaultProps = {
  lineHeight: '20px',
  margin: '4px 0 4px 0',
};

export default Text;
