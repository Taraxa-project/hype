import { render, screen } from 'src/testUtils';
import Input from '../Input';

describe('Input', () => {
  // it('should render a button with it children as content', () => {
  //   render(<Input />);
  //   expect(screen.getByRole('input')).toHaveTextContent('Test');
  // });

  it('should render a placeholder in input if contains a placeholder prop', () => {
    render(<Input placeholder="Test" />);
    expect(screen.getByRole('textbox')).toHaveProperty('placeholder', 'Test');
  });

  it('should render a disabled input if contains a disabled prop', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
