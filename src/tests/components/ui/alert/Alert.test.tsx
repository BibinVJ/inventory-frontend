import React from 'react';
import { render, screen } from '@testing-library/react';
import Alert from '../../../../components/ui/alert/Alert';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';

describe('Alert', () => {
  it('should render a success alert with the correct title and message', () => {
    render(
      <MemoryRouter>
        <Alert variant="success" title="Success" message="This is a success message." />
      </MemoryRouter>
    );
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('This is a success message.')).toBeInTheDocument();
  });

  it('should render an error alert with the correct title and message', () => {
    render(
      <MemoryRouter>
        <Alert variant="error" title="Error" message="This is an error message." />
      </MemoryRouter>
    );
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('This is an error message.')).toBeInTheDocument();
  });

  it('should render a warning alert with the correct title and message', () => {
    render(
      <MemoryRouter>
        <Alert variant="warning" title="Warning" message="This is a warning message." />
      </MemoryRouter>
    );
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('This is a warning message.')).toBeInTheDocument();
  });

  it('should render an info alert with the correct title and message', () => {
    render(
      <MemoryRouter>
        <Alert variant="info" title="Info" message="This is an info message." />
      </MemoryRouter>
    );
    expect(screen.getByText('Info')).toBeInTheDocument();
    expect(screen.getByText('This is an info message.')).toBeInTheDocument();
  });

  it('should render a link when showLink is true', () => {
    render(
      <MemoryRouter>
        <Alert
          variant="info"
          title="Info"
          message="This is an info message."
          showLink={true}
          linkText="Click here"
          linkHref="/test"
        />
      </MemoryRouter>
    );
    const link = screen.getByText('Click here');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });
});