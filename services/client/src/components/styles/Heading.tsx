import Text from './Text';

const Heading = Text.withComponent('h1');

Heading.defaultProps = {
  lineHeight: '20px',
  margin: '8px 0 8px 0',
};

export default Heading;
