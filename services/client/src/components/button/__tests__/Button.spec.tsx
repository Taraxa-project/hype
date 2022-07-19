import { render, screen } from 'src/testUtils';
import Button from 'src/components/button/Button';

describe('Button', () => {
  it('should render a button with it children as content', () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Test');
  });
});
