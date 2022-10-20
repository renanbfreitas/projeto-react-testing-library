import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../pages';

describe('Componente NotFound.js', () => {
  it('testa se a página deve ter um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByText('Page requested not found', {
      level: 2,
      name: /Page requested not found /i,
    });
    expect(notFound).toBeInTheDocument();
  });

  it('testa se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByRole('img');
    expect((image).src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
