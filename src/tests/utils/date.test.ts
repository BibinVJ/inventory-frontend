import { describe, it, expect } from 'vitest';
import { formatDate } from '../../utils/date';

describe('formatDate', () => {
  it('should format a date object into a YYYY-MM-DD string', () => {
    const date = new Date('2024-01-01T12:00:00.000Z');
    expect(formatDate(date)).toBe('2024-01-01');
  });

  it('should pad month and day with a leading zero if necessary', () => {
    const date = new Date('2024-03-04T12:00:00.000Z');
    expect(formatDate(date)).toBe('2024-03-04');
  });
});
