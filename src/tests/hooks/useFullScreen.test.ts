import { renderHook, act } from '@testing-library/react';
import useFullScreen from '../../hooks/useFullScreen';
import { describe, it, expect, vi } from 'vitest';

describe('useFullScreen', () => {
  it('should enter and exit fullscreen mode', () => {
    const requestFullscreen = vi.fn(() => Promise.resolve());
    const exitFullscreen = vi.fn(() => Promise.resolve());

    Object.defineProperty(document.documentElement, 'requestFullscreen', {
      value: requestFullscreen,
      writable: true,
    });

    Object.defineProperty(document, 'exitFullscreen', {
      value: exitFullscreen,
      writable: true,
    });

    const { result } = renderHook(() => useFullScreen());

    act(() => {
      result.current.enterFullScreen();
    });

    expect(requestFullscreen).toHaveBeenCalled();

    act(() => {
      result.current.exitFullScreen();
    });

    // This is tricky to test without a real DOM, so we'll just check if the exit function is called
    // when fullscreenElement is not null.
    Object.defineProperty(document, 'fullscreenElement', {
      value: {},
      writable: true,
    });

    act(() => {
      result.current.exitFullScreen();
    });

    expect(exitFullscreen).toHaveBeenCalled();
  });
});
