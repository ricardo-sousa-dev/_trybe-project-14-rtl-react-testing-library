import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

import pokemons from '../data';

const firstPokemon = pokemons[0];

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Testa se as informações do Pokémon são mostradas', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const namePokemon = screen.getByRole('heading', {
      name: `${firstPokemon.name} Details`,
    });
    expect(namePokemon).toBeInTheDocument();

    expect(moreDetails).not.toBeInTheDocument();

    const summaryH2 = screen.getByRole('heading', { name: /summary/i });
    expect(summaryH2).toBeInTheDocument();

    const summaryPokemon = screen.getByText(firstPokemon.summary);
    expect(summaryPokemon).toBeInTheDocument();
  });

  test('Testa se existe na página seção com mapas de localizações do pokémon', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));

    const locations = `Game Locations of ${firstPokemon.name}`;
    const headLocation = screen.getByRole('heading', { name: locations });
    expect(headLocation).toBeInTheDocument();

    const { foundAt } = firstPokemon;
    foundAt.forEach(({ location, map }, index) => {
      expect(screen.getByText(location)).toBeInTheDocument();
      // logica verificada em https://github.com/tryber/sd-013-a-project-react-testing-library/pull/48/files
      expect(screen.getAllByRole('img')[index + 1]).toHaveAttribute('src', map);

      const altText = `${firstPokemon.name} location`;
      expect(screen.getAllByAltText(altText)[index]).toBeInTheDocument();
    });
  });

  test('Testa favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /more details/i }));

    const favorite = screen.getByLabelText(/Pokémon favoritado?/i);
    const checkbox = screen.getByRole('checkbox', {
      name: /Pokémon favoritado?/i,
    });
    expect(checkbox).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();

    userEvent.click(checkbox);

    const starIcon = screen.getAllByRole('img')[1];
    expect(starIcon).toBeInTheDocument();

    userEvent.click(favorite);
    expect(starIcon).not.toBeInTheDocument();
  });
});
