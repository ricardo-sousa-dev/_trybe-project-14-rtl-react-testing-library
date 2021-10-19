import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    render(<FavoritePokemons />);
    const notFoundText = screen.getByText('No favorite pokemon found');
    expect(notFoundText).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetails);
    expect(history.location.pathname).toEqual('/pokemons/25');

    const favoriteCheckbox = screen.getByRole('checkbox');
    userEvent.click(favoriteCheckbox);

    const pikachu = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(pikachu).toBeInTheDocument();

    const favoritePoke = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(favoritePoke);
    expect(history.location.pathname).toEqual('/favorites');

    const pikachuName = screen.getByTestId('pokemon-name');
    expect(pikachuName).toBeInTheDocument();
  });
});
