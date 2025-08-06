import { describe, it, expect } from 'vitest';
import { formatKebabCase } from '../../utils/string';

describe('formatKebabCase', () => {
  it('should format a kebab-case string to a readable string', () => {
    expect(formatKebabCase('hello-world')).toBe('Hello World');
  });

  it('should return an empty string if the input is empty', () => {
    expect(formatKebabCase('')).toBe('');
  });

  it('should handle single words', () => {
    expect(formatKebabCase('hello')).toBe('Hello');
  });
});
