import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import api from '../api';
import { Home } from '../views/Home';

jest.mock('../api', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

const apiGetMock = api.get as jest.Mock;

const listResponse = [
  {
    name: 'Cafe Central',
    adress: 'Rua A, 123',
    uf: 'SP',
    municipality: 'Sao Paulo',
    assessment: 4.2,
    description: 'Cafe tradicional',
    image: 'cafe-central.jpg',
  },
];

const bestCoffeeResponse = [
  {
    name: 'Cafe Especial',
    adress: 'Rua B, 456',
    uf: 'RJ',
    municipality: 'Rio de Janeiro',
    assessment: 4.9,
    description: 'Cafe melhor avaliado',
    image: 'cafe-especial.jpg',
  },
];

const closestCoffeeResponse = [
  {
    name: 'Cafe Perto',
    adress: 'Rua C, 789',
    uf: 'MG',
    municipality: 'Belo Horizonte',
    assessment: 4.5,
    description: 'Cafe mais proximo',
    image: 'cafe-perto.jpg',
  },
];

function mockApiResponses() {
  apiGetMock.mockImplementation((url: string) => {
    if (url === '/list/best-coffe') {
      return Promise.resolve({ data: bestCoffeeResponse });
    }

    if (url === '/closest/coffe') {
      return Promise.resolve({ data: closestCoffeeResponse });
    }

    return Promise.resolve({ data: listResponse });
  });
}

function mockGeolocation() {
  Object.defineProperty(navigator, 'geolocation', {
    configurable: true,
    value: {
      getCurrentPosition: jest.fn((success) =>
        success({
          coords: {
            latitude: -23.5,
            longitude: -46.6,
          },
        })
      ),
    },
  });
}

function openWorkflowOptions() {
  fireEvent.click(screen.getByRole('button', { name: /selecione uma opção/i }));
}

describe('workflow da tela Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockApiResponses();
    mockGeolocation();
  });

  test('carrega a lista inicial de cafes', async () => {
    render(<Home />);

    await waitFor(() => expect(apiGetMock).toHaveBeenCalledWith('/list'));

    expect(await screen.findByText('Cafe Central')).toBeInTheDocument();
    expect(screen.getByText('Endereço: Rua A, 123')).toBeInTheDocument();
    expect(screen.getByText('Avaliação: 4.2')).toBeInTheDocument();
  });

  test('altera a lista ao selecionar melhores cafes', async () => {
    render(<Home />);

    await screen.findByText('Cafe Central');
    openWorkflowOptions();
    fireEvent.click(screen.getByText('Melhores Cafés'));

    await waitFor(() => expect(apiGetMock).toHaveBeenCalledWith('/list/best-coffe'));

    expect(await screen.findByText('Cafe Especial')).toBeInTheDocument();
    expect(screen.queryByText('Cafe Central')).not.toBeInTheDocument();
  });

  test('recarrega a lista ao selecionar lista', async () => {
    render(<Home />);

    await screen.findByText('Cafe Central');
    openWorkflowOptions();
    fireEvent.click(screen.getByText('Lista'));

    await waitFor(() => expect(apiGetMock).toHaveBeenCalledTimes(2));
    expect(apiGetMock).toHaveBeenLastCalledWith('/list');
    expect(await screen.findByText('Cafe Central')).toBeInTheDocument();
  });

  test('busca cafes proximos usando a localizacao do usuario', async () => {
    render(<Home />);

    await screen.findByText('Cafe Central');
    openWorkflowOptions();
    fireEvent.click(screen.getByText('Mais perto de você'));

    await waitFor(() =>
      expect(apiGetMock).toHaveBeenCalledWith('/closest/coffe', {
        params: {
          latitude: -23.5,
          longitude: -46.6,
        },
      })
    );

    expect(await screen.findByText('Cafe Perto')).toBeInTheDocument();
    expect(screen.queryByText('Cafe Central')).not.toBeInTheDocument();
  });
});
