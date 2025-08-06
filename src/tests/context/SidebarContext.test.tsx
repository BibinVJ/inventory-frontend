import { render, screen, act } from '@testing-library/react';
import { SidebarProvider } from '../../context/SidebarContext.tsx';
import { useSidebar } from '../../hooks/useSidebar';
import { describe, it, expect } from 'vitest';

const TestComponent = () => {
  const {
    isExpanded,
    isMobileOpen,
    openSubmenu,
    toggleSidebar,
    toggleMobileSidebar,
    toggleSubmenu,
  } = useSidebar();

  return (
    <div>
      <span data-testid="isExpanded">{isExpanded.toString()}</span>
      <span data-testid="isMobileOpen">{isMobileOpen.toString()}</span>
      <span data-testid="openSubmenu">{openSubmenu}</span>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
      <button onClick={toggleMobileSidebar}>Toggle Mobile Sidebar</button>
      <button onClick={() => toggleSubmenu('test')}>Toggle Submenu</button>
    </div>
  );
};

describe('SidebarProvider', () => {
  it('should toggle the sidebar', () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    );

    const isExpandedSpan = screen.getByTestId('isExpanded');
    const toggleButton = screen.getByText('Toggle Sidebar');

    expect(isExpandedSpan.textContent).toBe('true');

    act(() => {
      toggleButton.click();
    });

    expect(isExpandedSpan.textContent).toBe('false');
  });

  it('should toggle the mobile sidebar', () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    );

    const isMobileOpenSpan = screen.getByTestId('isMobileOpen');
    const toggleButton = screen.getByText('Toggle Mobile Sidebar');

    expect(isMobileOpenSpan.textContent).toBe('false');

    act(() => {
      toggleButton.click();
    });

    expect(isMobileOpenSpan.textContent).toBe('true');
  });

  it('should toggle a submenu', () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    );

    const openSubmenuSpan = screen.getByTestId('openSubmenu');
    const toggleButton = screen.getByText('Toggle Submenu');

    expect(openSubmenuSpan.textContent).toBe('');

    act(() => {
      toggleButton.click();
    });

    expect(openSubmenuSpan.textContent).toBe('test');

    act(() => {
      toggleButton.click();
    });

    expect(openSubmenuSpan.textContent).toBe('');
  });
});
