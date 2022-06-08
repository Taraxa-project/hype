import styled from 'styled-components';
import {
  space,
  display,
  width,
  height,
  flexbox,
  SpaceProps,
  WidthProps,
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
  DisplayProps,
} from 'styled-system';

type BoxProps = SpaceProps &
  WidthProps &
  HeightProps &
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
  AlignSelfProps;

const Flex = styled.div<BoxProps>`
  ${space}
  ${display}
  ${height}
  ${width}
  ${flexbox}
`;

export default Flex;
