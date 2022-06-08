import styled from 'styled-components';
import {
  space,
  color,
  fontSize,
  fontWeight,
  lineHeight,
  FontSizeProps,
  FontWeightProps,
  LineHeightProps,
  ColorProps,
  SpaceProps,
} from 'styled-system';

type TextProps = SpaceProps & FontSizeProps & FontWeightProps & LineHeightProps & ColorProps;

const Text = styled.p<TextProps>`
  ${space}
  ${fontSize}
  ${fontWeight}
  ${lineHeight}
  ${color}
`;

Text.defaultProps = {
  lineHeight: '20px',
  m: 0,
};

export default Text;
