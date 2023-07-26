import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';

describe('have I set up Jest correctly with Next.js?', () => {
  test('renders the navigation buttons', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /This is a heading for Jest-ing purposes.../,
    });
    expect(heading).toBeInTheDocument();
  })
});