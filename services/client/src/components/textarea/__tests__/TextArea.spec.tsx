import { render, screen } from 'src/testUtils';
import TextArea from '../TextArea';

describe('TextArea', () => {
  it('should render the component', () => {
    render(<TextArea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should be disabled if prop disabled is true', () => {
    render(<TextArea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('should have a placeholder containing the placeholder prop value', () => {
    render(<TextArea placeholder="test" />);
    expect(screen.getByPlaceholderText('test')).toBeVisible();
  });
});
