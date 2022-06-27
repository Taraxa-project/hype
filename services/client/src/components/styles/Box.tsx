import styled from 'styled-components';
import {
  space,
  display,
  overflow,
  overflowX,
  overflowY,
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
  gridColumnGap,
  gridRowGap,
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
  OverflowProps,
  MaxHeightProps,
} from 'styled-system';

export type BoxProps = SpaceProps &
  WidthProps &
  HeightProps &
  MinWidthProps &
  MaxWidthProps &
  MaxHeightProps &
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
  BorderRadiusProps &
  OverflowProps;

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
  ${overflow}
  ${overflowX}
  ${overflowY}
`;

export default Box;
