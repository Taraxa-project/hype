import { render } from 'src/testUtils';
import Tooltip from '../Tooltip';

describe('Tooltip', () => {
  it('should render a placeholder in input if contains a placeholder prop', () => {
    render(<Tooltip message="test" />);
  });
});
