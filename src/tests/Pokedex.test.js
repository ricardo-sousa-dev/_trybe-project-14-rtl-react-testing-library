import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

import pokemons from '../data';

// função adquirida no projeto do aluno Fernando
// https://github.com/tryber/sd-013-a-project-react-testing-library/pull/48/files

const nameTestId = 'pokemon-name';
const typeTestId = 'pokemon-type';
const typeButtonTestId = 'pokemon-type-button';

const allPokemons = () => {
  pokemons.forEach((pokemon) => {
    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const pokemonName = screen.getByTestId(nameTestId);
    expect(pokemonName).toHaveTextContent(pokemon.name);
    userEvent.click(buttonNext);
  });
};

// Guarda na variável os types do pokemons percorrendo pelo map
const pokemonTypes = pokemons.map((pokemon) => pokemon.type);

// Cria na constante onePokemonTypes um array de tipos de pokemon, tirando os valores repetidos.
const onePokemonTypes = [...new Set(pokemonTypes)];

describe('Teste o componente <Pokedex.js', () => {
  test('Teste H2 título página', () => {
    renderWithRouter(<App />);
    const EncounteredPokémons = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(EncounteredPokémons).toBeInTheDocument();
  });

  test('Teste exibição do próximo Pokémon ao clicar no em Próximo pokémon', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(buttonNext).toBeInTheDocument();
    allPokemons();
  });

  test('O primeiro Pokémon deve ser mostrado se estiver no último da lista', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    pokemons.forEach(() => {
      userEvent.click(buttonNext);
    });
    const firstPokemon = screen.getByTestId(nameTestId);
    expect(firstPokemon).toHaveTextContent(pokemons[0].name);
  });

  test('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const onlyOnePokemon = screen.getAllByTestId('pokemon-name');
    expect(onlyOnePokemon).toHaveLength(1);
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    onePokemonTypes.forEach((pokemonType, index) => {
      expect(screen.getAllByTestId(typeButtonTestId)[index]).toHaveTextContent(
        pokemonType,
      );
    });
  });

  test('Ao selecionar o tipo, deve mostrar somente pokémons daquele tipo', () => {
    renderWithRouter(<App />);

    onePokemonTypes.forEach((pokemonType, index) => {
      userEvent.click(screen.getAllByTestId(typeButtonTestId)[index]);
      // Simula click no elemento que tem o data-test-id de id next-pokemon
      userEvent.click(screen.getByTestId('next-pokemon'));
      // Testo na tela com o data-test-id tem o texto do elemento atual
      expect(screen.getByTestId(typeTestId)).toHaveTextContent(pokemonType);
    });
  });

  test('O texto do botão deve corresponder ao nome do tipo', () => {
    renderWithRouter(<App />);
    onePokemonTypes.forEach((pokemonType, index) => {
      userEvent.click(screen.getAllByTestId(typeButtonTestId)[index]);
      expect(screen.getAllByTestId(typeButtonTestId)[index]).toHaveTextContent(
        pokemonType,
      );
    });
  });

  test('Testa se o botão all está visível na página', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
  });

  test('deverá mostrar os Pokémons normalmente quando All for clicado', () => {
    renderWithRouter(<App />);
    onePokemonTypes.forEach((pokemonType, index) => {
      userEvent.click(screen.getAllByTestId(typeButtonTestId)[index]);
      userEvent.click(screen.getByRole('button', { name: /all/i }));
      allPokemons();
    });
  });

  // test('Ao carregar a página, o filtro selecionado deverá ser All', () => {
  //   renderWithRouter(<App />);
  //   onePokemonTypes.forEach((pokemonType, index) => {
  //     userEvent.click(screen.getAllByTestId(typeButtonTestId)[index]);
  //     userEvent.click(screen.getByRole('button', { name: /all/i }));
  //     allPokemons();
  //   });
  // });
});
