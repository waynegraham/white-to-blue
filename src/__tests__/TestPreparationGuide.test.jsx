import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestPreparationGuide from '../TestPreparationGuide';

test('renders test preparation guide hero heading', () => {
  render(<TestPreparationGuide />);
  expect(screen.getByRole('heading', { name: 'Test Preparation Guide' })).toBeInTheDocument();
});

test('renders anchor navigation items', () => {
  render(<TestPreparationGuide />);

  expect(screen.getByRole('link', { name: 'Overview' })).toHaveAttribute('href', '#overview');
  expect(screen.getByRole('link', { name: '30-Day Plan' })).toHaveAttribute(
    'href',
    '#plan-30-day',
  );
  expect(screen.getByRole('link', { name: 'Shark Tank Strategy' })).toHaveAttribute(
    'href',
    '#shark-tank',
  );
});

test('renders section headings with expected ids', () => {
  render(<TestPreparationGuide />);

  expect(screen.getByRole('heading', { name: 'Overview' }).closest('article')).toHaveAttribute(
    'id',
    'overview',
  );
  expect(screen.getByRole('heading', { name: '30-Day Plan' }).closest('article')).toHaveAttribute(
    'id',
    'plan-30-day',
  );
  expect(
    screen.getByRole('heading', { name: 'Shark Tank Strategy' }).closest('article'),
  ).toHaveAttribute('id', 'shark-tank');
});
