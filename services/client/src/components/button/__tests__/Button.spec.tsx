import { render, screen } from 'src/testUtils';
import Button from '../Button';

describe('Button', () => {
  it('should render a button with it children as content', () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Test');
  });

  it('should render a disabled button if contains a disabled prop', () => {
    render(<Button disabled>Test</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
