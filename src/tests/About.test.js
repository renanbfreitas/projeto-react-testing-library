import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from './renderWithRouter';

describe('Componente About.js', () => {
    it('testa se a página contém as informações sobre a Pokédex.', () => {
        renderWithRouter(<About />);
        const aboutPokedex = screen.getByText('About Pokédex');
        expect(aboutPokedex).toBeInTheDocument();
    });

    it('testa se a página contém um heading h2 com o texto About Pokédex', () => {
        renderWithRouter(<About />);
        const aboutHeading = screen.getByRole('heading', {
            level: 2,
            name: /About Pokédex/i,
        });
        console.log(aboutHeading);
        expect(aboutHeading).toBeInTheDocument();
    });

    it('testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
        renderWithRouter(<About />);
        const aboutText = screen.getAllByText(/Pokémons/i);
        expect(aboutText.length).toBe(2);
    });

    it('testa se a página contém a imagem de uma Pokédex', () => {
        renderWithRouter(<About />);
        const image = screen.getByRole('img');
        expect((image).src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    });
});
