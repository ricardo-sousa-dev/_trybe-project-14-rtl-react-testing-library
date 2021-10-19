import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('1. Teste o componente <App.js />', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    const linkFavorites = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorites).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a "Home"', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });

    userEvent.click(linkHome);
    expect(history.location.pathname).toEqual('/');
  });

  test('Teste se a aplicação é redirecionada para a URL "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(linkAbout);
    expect(history.location.pathname).toEqual('/about');
  });

  test('Teste se a aplicação é redirecionada para a URL "/favorites"', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorites = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(linkFavorites);
    expect(history.location.pathname).toEqual('/favorites');
  });

  test('Renderiza mensagem de "Página não encontrada"', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-que-nao-existe');

    const notFoundText = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
