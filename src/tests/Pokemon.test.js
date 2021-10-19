import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

import pokemons from '../data';

const nameTestId = 'pokemon-name';
const weightTestId = 'pokemon-weight';
const firstPokemon = pokemons[0];

describe('6. Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações do pokémon.', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByTestId(nameTestId);
    expect(namePokemon).toHaveTextContent(firstPokemon.name);

    const weightPokemon = screen.getByTestId(weightTestId);
    expect(weightPokemon).toHaveTextContent(/Average weight:/i);

    const { value, measurementUnit } = firstPokemon.averageWeight;
    expect(weightPokemon).toHaveTextContent(value);
    expect(weightPokemon).toHaveTextContent(measurementUnit);

    const imageName = `${firstPokemon.name} sprite`;
    const imagePokemon = screen.getByRole('img', { name: imageName });
    expect(imagePokemon).toBeInTheDocument();
    expect(imagePokemon).toHaveAttribute('alt', `${firstPokemon.name} sprite`);
    expect(imagePokemon).toHaveAttribute('src', firstPokemon.image);
  });

  test('Teste se o card do Pokémon contém um link de navegação', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toHaveAttribute('href', `/pokemons/${firstPokemon.id}`);
  });

  test('Teste se ao clicar no link de navegação do Pokémon, é redirecionado', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const { name, id } = firstPokemon;
    const titlePokemon = screen.getByRole('heading', {
      name: `${name} Details`,
    });
    expect(titlePokemon).toBeInTheDocument();
    expect(history.location.pathname).toEqual(`/pokemons/${id}`);
  });

  test('A img tem alt="<pokemon> is marked as favorite"', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const favorite = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(favorite);

    const starIcon = screen.getByAltText(
      `${firstPokemon.name} is marked as favorite`,
    );
    expect(starIcon).toBeInTheDocument();
  });

  test('O ícone deve ser uma imagem com src /star-icon.svg', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const favorite = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(favorite);

    userEvent.click(favorite);

    const images = screen.getAllByRole('img');

    expect(images[1]).toHaveAttribute('src', '/star-icon.svg');
  });
});
