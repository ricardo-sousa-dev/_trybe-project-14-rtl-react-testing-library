import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('2. Teste o componente <About.js />.', () => {
  test('Teste H2 título página', () => {
    render(<About />);
    const titlePokedex = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });

    expect(titlePokedex).toBeInTheDocument();
  });

  test('Teste se a página contém as informações sobre a Pokédex', () => {
    render(<About />);
    const textPokedex = screen.getByText(
      /This application simulates a Pokédex/i,
    );
    const textPokedex2 = screen.getByText(/One can filter Pokémons by/i);

    expect(textPokedex).toBeInTheDocument();
    expect(textPokedex2).toBeInTheDocument();
  });

  test('Teste da imagem da página', () => {
    render(<About />);
    const image = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imageAbout = screen.getByRole('img');
    expect(imageAbout.src).toBe(image);
  });
});
