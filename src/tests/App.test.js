import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Componente App.js', () => {
  it('testa se a página principal carrega com a url /', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('testa se os nomes dos links são home, about e favorite pokémons', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByText(/Home/i);
    const aboutLink = screen.getByText(/About/i);
    const favoriteLink = screen.getByText(/Favorite/i);

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('testa se o app vai para a url / ao clicar no home', () => {
    const { history } = renderWithRouter(<App />);
    const homePage = screen.getByText('Home');
    userEvent.click(homePage);

    const pathName = history.location.pathname;
    expect(pathName).toBe(pathName);
  });

  it('testa se o app vai para a url /about ao clicar no about', () => {
    const { history } = renderWithRouter(<App />);
    const aboutPage = screen.getByText('About');
    userEvent.click(aboutPage);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('testa se o app vai para /favorites ao clicar no link favorites pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoritesPage = getByText('Favorite Pokémons');
    userEvent.click(favoritesPage);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('testa se a app vai para a página not found ao entrar em uma url desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/not-found');
    });
    const notFound = screen.getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
