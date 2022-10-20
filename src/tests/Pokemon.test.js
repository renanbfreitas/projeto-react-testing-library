import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Componente Pokemon.js', () => {
  it('testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const namePoke = screen.getByText('Pikachu');
    const typePoke = screen.getByTestId('pokemon-type');
    const PokeAverageWeight = screen.getByText('Average weight: 6.0 kg');
    const imagePoke = screen.getByAltText('Pikachu sprite');
    const cardImagePoke = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(typePoke.textContent).toBe('Electric');
    expect(namePoke).toBeInTheDocument();
    expect(PokeAverageWeight).toBeInTheDocument();
    expect(imagePoke.src).toBe(cardImagePoke);
  });

  it('testa se o card do Pokémon indicado na Pokédex contém um link para exibir detalhes', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: 'More details',
    });
    expect(linkDetails.href).toBe('http://localhost/pokemons/25');
    fireEvent.click(linkDetails);
    const pathname = renderWithRouter;
    expect(pathname).toBe(pathname);
  });
  it('testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    fireEvent.click(linkDetails);
    const favoritePokemon = screen.getByText('Pokémon favoritado?');
    fireEvent.click(favoritePokemon);
    const images = screen.getAllByRole('img')[1];
    expect(images.src).toBe('http://localhost/star-icon.svg');
    expect(images.alt).toBe('Pikachu is marked as favorite');
  });
});
