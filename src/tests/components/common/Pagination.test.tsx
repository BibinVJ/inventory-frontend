import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../../../components/common/Pagination';
import { describe, it, expect, vi } from 'vitest';

describe('Pagination', () => {
  const onPageChange = vi.fn();

  it('should render the correct page numbers and disable buttons correctly', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={onPageChange}
        from={1}
        to={10}
        total={100}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();

    expect(screen.getByText('Previous')).toBeDisabled();
    expect(screen.getByText('Next')).not.toBeDisabled();
  });

  it('should call onPageChange with the correct page number when a page is clicked', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={onPageChange}
        from={1}
        to={10}
        total={100}
      />
    );

    fireEvent.click(screen.getByText('2'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange with the correct page number when next is clicked', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        onPageChange={onPageChange}
        from={11}
        to={20}
        total={100}
      />
    );

    fireEvent.click(screen.getByText('Next'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('should call onPageChange with the correct page number when previous is clicked', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        onPageChange={onPageChange}
        from={11}
        to={20}
        total={100}
      />
    );

    fireEvent.click(screen.getByText('Previous'));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});