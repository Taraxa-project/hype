import styled from 'styled-components';
import {
  space,
  width,
  color,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  FontSizeProps,
  FontWeightProps,
  LineHeightProps,
  ColorProps,
  SpaceProps,
  WidthProps,
  LetterSpacingProps,
} from 'styled-system';

type TextProps = SpaceProps &
  FontSizeProps &
  FontWeightProps &
  LineHeightProps &
  ColorProps &
  LetterSpacingProps &
  WidthProps;

const Text = styled.p<TextProps>`
  ${space}
  ${width}
  ${fontSize}
  ${fontWeight}
  ${lineHeight}
  ${color}
  ${letterSpacing}
`;

Text.defaultProps = {
  lineHeight: '20px',
  margin: '4px 0 4px 0',
};

export default Text;
