import { render, screen } from '@testing-library/react';
import { Card } from './components/Card';


describe('Card component', () => {
  it('renders card information correctly', () => {
    render(
      <Card
        name="Restaurante Central"
        adress="Rua das Flores, 123"
        image={''}
        uf="SP"
        municipality="São Paulo"
        assessment={4.5}
        description="Comida caseira e ambiente agradável"
      />
    );

    // Título
    expect(
      screen.getByRole('heading', { name: /restaurante central/i })
    ).toBeInTheDocument();

    // Textos principais
    expect(
      screen.getByText(/endereço: rua das flores, 123/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/estado: sp/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/cidade: são paulo/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/descrição: comida caseira e ambiente agradável/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/avaliação: 4.5/i)
    ).toBeInTheDocument();
  });

  it('renders image with correct alt text', () => {
    render(
      <Card
        name="Café Brasil"
        adress="Av. Paulista, 1000"
        uf="SP"
        image={''}
        municipality="São Paulo"
        assessment={5}
        description="Café especial"
      />
    );

    const image = screen.getByRole('img', {
      name: /café brasil/i,
    });

    expect(image).toBeInTheDocument();
  });
});