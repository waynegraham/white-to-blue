import { render, screen } from '@testing-library/react';
import Navigation from '../components/Navigation';
import '@testing-library/jest-dom';

test('renders navigation links', () => {
  render(<Navigation />);
  expect(screen.getByText('White to Blue')).toBeInTheDocument();
  expect(screen.getByText('Blue to Purple')).toBeInTheDocument();
  expect(screen.getByText('Purple to Brown')).toBeInTheDocument();
});
