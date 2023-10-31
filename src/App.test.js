import { render, screen } from '@testing-library/react';
// import App from './App';
import Cars from './pages/Cars';



test('renderiza Name', () => {
  render(<Cars />);
  const tableElement = screen.getByText('Name');
  expect(tableElement).toBeInTheDocument();
});

test('renderiza Description', () => {
  render(<Cars />);
  const tableElement = screen.getByText('Description');
  expect(tableElement).toBeInTheDocument();
});
