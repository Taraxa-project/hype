import styled from 'styled-components';
import { space, color, fontSize, fontWeight, lineHeight } from 'styled-system';

const Text = styled.div`
  ${space}
  ${fontSize}
  ${fontWeight}
  ${lineHeight}
  ${color}
`;
Text.propTypes = {
  ...space.propTypes,
  ...fontSize.propTypes,
  ...fontWeight.propTypes,
  ...lineHeight.propTypes,
  ...color.propTypes,
};

export default Text;
