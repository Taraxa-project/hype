import { render, screen } from 'src/testUtils';
import { NotAvailable } from '../NotAvailable';

describe('NotAvailable', () => {
  it('should render the default message if message prop is not defined', () => {
    render(<NotAvailable />);
    expect(screen.getByText('Connect wallet to see the history of rewards...')).toBeInTheDocument();
  });

  it('should render the message prop is defined', () => {
    render(<NotAvailable message="test message" />);
    expect(screen.getByText('test message')).toBeInTheDocument();
  });
});
