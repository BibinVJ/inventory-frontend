import { render, screen, act } from '@testing-library/react';
import { ThemeProvider } from '../../context/ThemeContext.tsx';
import { useTheme } from '../../hooks/useTheme';
import { describe, it, expect } from 'vitest';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  it('should toggle the theme and update localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeSpan = screen.getByTestId('theme');
    const toggleButton = screen.getByText('Toggle Theme');

    // Check initial theme
    expect(themeSpan.textContent).toBe('light');

    // Toggle theme to dark
    act(() => {
      toggleButton.click();
    });
    expect(themeSpan.textContent).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');

    // Toggle theme back to light
    act(() => {
      toggleButton.click();
    });
    expect(themeSpan.textContent).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
