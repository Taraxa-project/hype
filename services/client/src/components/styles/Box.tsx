import styled from 'styled-components';
import {
  space,
  display,
  color,
  gridGap,
  fontSize,
  width,
  minHeight,
  minWidth,
  maxHeight,
  maxWidth,
  height,
  flexbox,
  borderRadius,
  SpaceProps,
  WidthProps,
  FontSizeProps,
  ColorProps,
  FlexProps,
  FlexWrapProps,
  FlexDirectionProps,
  FlexShrinkProps,
  FlexGrowProps,
  FlexBasisProps,
  JustifyContentProps,
  JustifyItemsProps,
  JustifySelfProps,
  AlignContentProps,
  AlignItemsProps,
  AlignSelfProps,
  HeightProps,
  MinWidthProps,
  MaxWidthProps,
  MinHeightProps,
  DisplayProps,
  GridGapProps,
  BorderRadiusProps,
} from 'styled-system';

type BoxProps = SpaceProps &
  WidthProps &
  HeightProps &
  MinWidthProps &
  MaxWidthProps &
  MinHeightProps &
  MinWidthProps &
  FontSizeProps &
  ColorProps &
  DisplayProps &
  FlexProps &
  FlexWrapProps &
  FlexDirectionProps &
  FlexShrinkProps &
  FlexGrowProps &
  FlexBasisProps &
  JustifyContentProps &
  JustifyItemsProps &
  JustifySelfProps &
  AlignContentProps &
  AlignItemsProps &
  AlignSelfProps &
  GridGapProps &
  BorderRadiusProps;

const Box = styled.div<BoxProps>`
  ${space}
  ${display}
  ${height}
  ${gridGap}
  ${width}
  ${minWidth}
  ${maxWidth}
  ${minHeight}
  ${maxHeight}
  ${fontSize}
  ${color}
  ${flexbox}
  ${borderRadius}
`;

export default Box;
