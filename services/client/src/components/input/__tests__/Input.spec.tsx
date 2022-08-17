import SearchIcon from 'src/assets/icons/Search';
import { render, screen } from 'src/testUtils';
import Input from '../Input';

describe('Input', () => {
  it('should render a search icon if icon prop is set', () => {
    render(<Input icon={<SearchIcon />} />);
    expect(screen.getByTitle('Search Icon').parentElement).toBeTruthy();
  });

  it('should render a placeholder in input if contains a placeholder prop', () => {
    render(<Input placeholder="Test" />);
    expect(screen.getByRole('textbox')).toHaveProperty('placeholder', 'Test');
  });

  it('should render a disabled input if contains a disabled prop', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
