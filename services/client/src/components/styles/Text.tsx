import styled from 'styled-components';
import {
  space,
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
  LetterSpacingProps,
} from 'styled-system';

type TextProps = SpaceProps & FontSizeProps & FontWeightProps & LineHeightProps & ColorProps & LetterSpacingProps;

const Text = styled.p<TextProps>`
  ${space}
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
