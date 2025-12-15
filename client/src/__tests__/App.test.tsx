import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '@/App';

describe('App', () => {
  it('should render the app title', () => {
    render(<App />);
    expect(screen.getByText('Storage Manager')).toBeInTheDocument();
  });

  it('should render Vite + React + TypeScript text', () => {
    render(<App />);
    expect(screen.getByText('Vite + React + TypeScript')).toBeInTheDocument();
  });

  it('should increment count when button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const button = screen.getByRole('button', { name: /count is 0/i });
    expect(button).toBeInTheDocument();
    
    await user.click(button);
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument();
  });
});
