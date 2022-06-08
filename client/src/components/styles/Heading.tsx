import Text from './Text';

const Heading = Text.withComponent('h1');

Heading.defaultProps = {
  lineHeight: '20px',
  m: 0,
};

export default Heading;
