import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Componente FavoritePokemons.js', () => {
  it('testa se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const textNotFav = screen.getByText('No favorite pokemon found');
    expect(textNotFav).toBeInTheDocument();
  });

  it('testa se são exibidos todos os cards de pokémons favoritados', () => {
    const pokemonInfo = {
      pokemName: 'Pikachu',
      pokemType: 'Electric',
      pokeWeight: 'Average weight: 6.0 kg',
    };
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    const moreInfoLink = getByText('More details');
    expect(moreInfoLink).toBeInTheDocument();
    fireEvent.click(moreInfoLink);
    const pokekonfav = getByLabelText('Pokémon favoritado?');
    fireEvent.click(pokekonfav);
    expect(pokekonfav).toBeChecked();
    fireEvent.click(getByText(/Favorite Pokémons/));
    expect(screen.getByTestId('pokemon-name').textContent).toBe(pokemonInfo.pokemName);
  });
});
