import { renderHook } from '@testing-library/react';
import useGoBack from '../../hooks/useGoBack';
import { describe, it, expect, vi } from 'vitest';

const navigate = vi.fn();

vi.mock('react-router', () => ({
  useNavigate: () => navigate,
}));

describe('useGoBack', () => {
  it('should call navigate with -1 if there is history', () => {
    // Mock window.history.state
    Object.defineProperty(window, 'history', {
      value: {
        state: { idx: 1 },
      },
      writable: true,
    });

    const { result } = renderHook(() => useGoBack());
    result.current();
    expect(navigate).toHaveBeenCalledWith(-1);
  });

  it('should call navigate with "/" if there is no history', () => {
    // Mock window.history.state
    Object.defineProperty(window, 'history', {
      value: {
        state: null,
      },
      writable: true,
    });

    const { result } = renderHook(() => useGoBack());
    result.current();
    expect(navigate).toHaveBeenCalledWith('/');
  });
});
