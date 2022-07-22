import { render, screen } from 'src/testUtils';
import HoverBackground from '../HoverBackground.styled';

describe('HoverBackground', () => {
  it('should render just children is show is not defined or false', () => {
    render(<HoverBackground>Test</HoverBackground>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should render a hover background (DIV) if show is true', () => {
    const { container } = render(<HoverBackground show>Test</HoverBackground>);
    expect(container.firstChild.nodeName).toBe('DIV');
  });
});
