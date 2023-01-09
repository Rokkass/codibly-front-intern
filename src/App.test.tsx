import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { App, WrappedApp } from './App';

describe('App', () => {
  it('Page back button disabled on app start', () => {
    render(<WrappedApp />);
    expect(
      screen.getByRole('button', {
        name: /page_back/i,
      })
    ).toBeDisabled();
  });
  it('Renders not found if invalid path', () => {
    render(
      <MemoryRouter initialEntries={['/this-route-does-not-exist']}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Not Found');
  });
});
