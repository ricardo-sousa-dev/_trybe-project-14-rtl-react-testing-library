import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('2. Teste o componente <About.js />.', () => {
  test('Teste H2 título página', () => {
    render(<NotFound />);
    const titleNotFound = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    expect(titleNotFound).toBeInTheDocument();
  });

  test('Teste da imagem da página', () => {
    render(<NotFound />);
    const imageNotFound = screen.getByRole('img', { name: /Crying emoji/i });
    const message = 'Pikachu crying because the page requested was not found';
    const img = screen.getByAltText(message);
    const imgURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img.src).toEqual(imgURL);
    expect(imageNotFound).toBeInTheDocument();
  });
});
