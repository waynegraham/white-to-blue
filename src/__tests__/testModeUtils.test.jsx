import { buildYoutubeUrl, flattenMoveSections } from '../components/test-mode/testModeUtils';

describe('buildYoutubeUrl', () => {
  test('returns empty string when youtube id is missing', () => {
    expect(buildYoutubeUrl('')).toBe('');
    expect(buildYoutubeUrl(undefined)).toBe('');
  });

  test('builds a watch url with query params', () => {
    expect(buildYoutubeUrl('abc123?start=7')).toBe('https://www.youtube.com/watch?v=abc123&start=7');
  });

  test('builds a watch url without query params', () => {
    expect(buildYoutubeUrl('abc123')).toBe('https://www.youtube.com/watch?v=abc123');
  });
});

describe('flattenMoveSections', () => {
  test('flattens sections and appends section labels to each move', () => {
    const sections = [
      {
        label: 'Standing',
        moves: [{ name: 'Close the gap' }, { name: 'Sucker Punch Defense' }],
      },
      {
        label: 'Ground',
        moves: [{ name: 'Elbow Escape' }],
      },
    ];

    expect(flattenMoveSections(sections)).toEqual([
      { name: 'Close the gap', sectionLabel: 'Standing' },
      { name: 'Sucker Punch Defense', sectionLabel: 'Standing' },
      { name: 'Elbow Escape', sectionLabel: 'Ground' },
    ]);
  });

  test('handles missing or empty sections safely', () => {
    expect(flattenMoveSections()).toEqual([]);
    expect(flattenMoveSections([])).toEqual([]);
    expect(flattenMoveSections([{ label: 'No Moves' }])).toEqual([]);
  });
});
