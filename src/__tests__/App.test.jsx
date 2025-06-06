import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

// Mock createRoot from react-dom/client since Vite main uses it
vi.mock('react-dom/client', () => ({
  createRoot: () => ({ render: () => null })
}));

test('opens modal when clicking a move', () => {
  render(<App />);
  const link = screen.getByText('Close the gap');
  fireEvent.click(link);
  expect(screen.getByText('Close')).toBeInTheDocument();
});
