import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Componente Pokedex.js', () => {
  it('testa se  página deve ter um heading h2 com o texto encountered pokemons', () => {
    renderWithRouter(<App />);
    const encounteredPoke = screen.getByText('Encountered pokémons', {
      level: 2,
      name: /encountered pokémons/i,
    });

    expect(encounteredPoke).toBeInTheDocument();
  });
});

describe('testa se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
  it('O botão deve conter o texto Próximo pokémon', () => {
    renderWithRouter(<App />);
    const btnNextPoke = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(btnNextPoke).toBeInTheDocument();
  });

  it('Os próximos pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão', () => {
    renderWithRouter(<App />);
    const pokeNextList = screen.getAllByRole('img');
    const nextButton = screen.getByTestId('next-pokemon');
    fireEvent.click(nextButton);
    expect(pokeNextList).toHaveLength(1);
  });

  it('O primeiro pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último pokémon da lista', () => {
    renderWithRouter(<App />);
    const firstPokeButton = screen.getByTestId('next-pokemon');
    expect(firstPokeButton).toBeInTheDocument();
    const firstPoke = screen.getByTestId('pokemon-name');

    fireEvent.click(firstPokeButton);
    fireEvent.click(firstPokeButton);
    fireEvent.click(firstPokeButton);
    fireEvent.click(firstPokeButton);
    fireEvent.click(firstPokeButton);
    fireEvent.click(firstPokeButton);
    fireEvent.click(firstPokeButton);
    fireEvent.click(firstPokeButton);
    expect(firstPoke.textContent).toBe('Dragonair');

    fireEvent.click(firstPokeButton);
    expect(firstPoke.textContent).toBe('Pikachu');
  });

  it('testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokeOnlyFirst = screen.getAllByRole('img');
    expect(pokeOnlyFirst).toHaveLength(1);
  });
});

describe('Sobre botões de filtro', () => {
  it('teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByText('All');
    const btnTypes = screen.getAllByTestId('pokemon-type-button');
    btnTypes.forEach((btnType) => {
      expect(btnType).toBeInTheDocument();
    });
    expect(btnAll).toBeInTheDocument();
  });

  it('teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const PsychicBtn = screen.getByRole('button', {
      name: /Psychic/i,
    });
    userEvent.click(PsychicBtn);
    expect(screen.getByText('Alakazam').textContent).toBe('Alakazam');
    const btnAll = screen.getByText('All');
    userEvent.click(btnAll);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });

  it('O texto do botão deve ser All', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();
  });
});

describe('', () => {
  it('testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const typesOfPoke = ['Electric',
      'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    typesOfPoke.forEach((type) => {
      const typePokemon = screen.getByRole('button', { name: type });
      expect(typePokemon).toBeInTheDocument();
    });
    const allButtons = screen.getAllByTestId('pokemon-type-button');
    allButtons.forEach((button) => expect(button).toBeInTheDocument());
  });
});
