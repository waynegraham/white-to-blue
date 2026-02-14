import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

vi.mock('react-dom/client', () => ({
  createRoot: () => ({ render: () => null }),
}));

import { RouterApp } from '../main';

test('renders guide route at /test-preparation-guide', () => {
  window.history.pushState({}, '', '/test-preparation-guide');
  render(<RouterApp />);

  expect(screen.getByRole('heading', { name: 'Test Preparation Guide' })).toBeInTheDocument();
});
