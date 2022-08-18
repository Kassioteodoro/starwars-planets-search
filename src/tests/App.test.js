import React from 'react';
import { screen } from '@testing-library/dom';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const I_NAME = 'name-filter';
const I_NUMBER = 'value-filter';
const B_FILTRAR = 'button-filter';
const B_R_FILTRO = 'button-remove-filters';
const COLUMN_S = 'column-filter';
const COMPARISON_S = 'comparison-filter';

describe('testando a Tabela', () => {
  it('se os elementos existem', async () => {
    render(<App />);
    const titleName = screen.getByText('Name');
    expect(titleName).toBeInTheDocument();
    const titleRotation = screen.getByText('Rotation Period');
    expect(titleRotation).toBeInTheDocument();
    const titleOrbital = screen.getByText('Orbital Period');
    expect(titleOrbital).toBeInTheDocument();
    const titleDiameter = screen.getByText('Diameter');
    expect(titleDiameter).toBeInTheDocument();
    const titleClimate = screen.getByText('Climate');
    expect(titleClimate).toBeInTheDocument();
    const titleGravity = screen.getByText('Gravity');
    expect(titleGravity).toBeInTheDocument();
    const titleTerrain = screen.getByText('Terrain');
    expect(titleTerrain).toBeInTheDocument();
    const titleSurfaceWater = screen.getByText('Surface Water');
    expect(titleSurfaceWater).toBeInTheDocument();
    const titlePopulation = screen.getByText('Population');
    expect(titlePopulation).toBeInTheDocument();
    const titleFilms = screen.getByText('Films');
    expect(titleFilms).toBeInTheDocument();
    const titleCreated = screen.getByText('Created');
    expect(titleCreated).toBeInTheDocument();
    const titleEdited = screen.getByText('Edited');
    expect(titleEdited).toBeInTheDocument();
    const titleURL = screen.getByText('URL');
    expect(titleURL).toBeInTheDocument();
    await waitFor(() => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      const lines = screen.getAllByTestId('tr');
      expect(lines.length).toBe(Number('10'));
    });
  });
});

describe('testando o header', () => {
  it('se os elementos existem', () => {
    render(<App />);
    const inputName = screen.getByTestId(I_NAME);
    expect(inputName).toBeInTheDocument();
    const inputNumber = screen.getByTestId(I_NUMBER);
    expect(inputNumber).toBeInTheDocument();
    const buttonFiltrar = screen.getByTestId(B_FILTRAR);
    expect(buttonFiltrar).toBeInTheDocument();
    const buttonRemoverFiltros = screen.getByTestId(B_R_FILTRO);
    expect(buttonRemoverFiltros).toBeInTheDocument();
    const columnSelect = screen.getByTestId(COLUMN_S);
    expect(columnSelect).toBeInTheDocument();
    const comparisonSelect = screen.getByTestId(COMPARISON_S);
    expect(comparisonSelect).toBeInTheDocument();
  });
});

describe('testando a funcionalidade dos filtros', () => {
  it('se o inputName ao preenchido com O a tabela e alterada', async () => {
    render(<App />);
    const inputName = screen.getByTestId(I_NAME);
    userEvent.type(inputName, 'o');
    await waitFor(() => {
      const lines = screen.getAllByTestId('tr');
      expect(lines.length).toBe(Number('7'));
    });
  });
  it('se o inputName ao preenchido com OO a tabela e alterada', async () => {
    render(<App />);
    const inputName = screen.getByTestId(I_NAME);
    userEvent.type(inputName, 'oo');
    await waitFor(() => {
      const lines = screen.getAllByTestId('tr');
      expect(lines.length).toBe(2);
    });
  });
  it('se ao criar um filtro numero a tabela e alterada', async () => {
    render(<App />);
    const inputNumber = screen.getByTestId(I_NUMBER);
    const buttonFiltrar = screen.getByTestId(B_FILTRAR);

    userEvent.type(inputNumber, '1000');
    userEvent.click(buttonFiltrar);
    await waitFor(() => {
      const lines = screen.getAllByTestId('tr');
      expect(lines.length).toBe(Number('7'));
    });
  });

  it('se criar dois filtro numeros eles sao somados e a tabela e alterada', async () => {
    render(<App />);
    const inputNumber = screen.getByTestId(I_NUMBER);
    const buttonFiltrar = screen.getByTestId(B_FILTRAR);
    const columnSelect = screen.getByTestId(COLUMN_S);
    const comparisonSelect = screen.getByTestId(COMPARISON_S);

    userEvent.type(inputNumber, '1000');
    userEvent.click(buttonFiltrar);

    userEvent.selectOptions(columnSelect, ['surface_water']);
    userEvent.selectOptions(comparisonSelect, ['menor que']);
    userEvent.type(inputNumber, '15');
    userEvent.click(buttonFiltrar);
    await waitFor(() => {
      const lines = screen.getAllByTestId('tr');
      expect(lines.length).toBe(Number('4'));
    });
  });

  it('se criar um filtro de numero e de nome os dois sao somados', async () => {
    render(<App />);
    const inputNumber = screen.getByTestId(I_NUMBER);
    const buttonFiltrar = screen.getByTestId(B_FILTRAR);
    const inputName = screen.getByTestId(I_NAME);
    userEvent.type(inputNumber, '1000');
    userEvent.click(buttonFiltrar);
    userEvent.type(inputName, 'a');
    await waitFor(() => {
      const lines = screen.queryAllByTestId('tr');
      expect(lines.length).toBe(Number('5'));
    });
  });
  it('se o filtro do tipo orbilta period esta funcionando corretamente', async () => {
    render(<App />);
    const inputNumber = screen.getByTestId(I_NUMBER);
    const buttonFiltrar = screen.getByTestId(B_FILTRAR);
    const columnSelect = screen.getByTestId(COLUMN_S);
    const comparisonSelect = screen.getByTestId(COMPARISON_S);

    userEvent.selectOptions(columnSelect, ['orbital_period']);
    userEvent.selectOptions(comparisonSelect, ['menor que']);
    userEvent.type(inputNumber, '400');

    userEvent.click(buttonFiltrar);

    await waitFor(() => {
      const lines = screen.queryAllByTestId('tr');
      expect(lines.length).toBe(Number('5'));
    });
  });
  it('se o filtro do tipo Diameter esta funcionando corretamente', async () => {
    render(<App />);
    const inputNumber = screen.getByTestId(I_NUMBER);
    const buttonFiltrar = screen.getByTestId(B_FILTRAR);
    const columnSelect = screen.getByTestId(COLUMN_S);
    const comparisonSelect = screen.getByTestId(COMPARISON_S);

    userEvent.selectOptions(columnSelect, ['diameter']);
    userEvent.selectOptions(comparisonSelect, ['igual a']);
    userEvent.type(inputNumber, '{del}4900');

    userEvent.click(buttonFiltrar);

    await waitFor(() => {
      const lines = screen.queryAllByTestId('tr');
      expect(lines.length).toBe(1);
    });
  });
  it('se o filtro do tipo Rotation Period esta funcionando corretamente', async () => {
    render(<App />);
    const inputNumber = screen.getByTestId(I_NUMBER);
    const buttonFiltrar = screen.getByTestId(B_FILTRAR);
    const columnSelect = screen.getByTestId(COLUMN_S);
    const comparisonSelect = screen.getByTestId(COMPARISON_S);

    userEvent.selectOptions(columnSelect, ['rotation_period']);
    userEvent.selectOptions(comparisonSelect, ['menor que']);
    userEvent.type(inputNumber, '20');

    userEvent.click(buttonFiltrar);

    await waitFor(() => {
      const lines = screen.queryAllByTestId('tr');
      expect(lines.length).toBe(2);
    });
  });
  it('se o filtro do tipo Surface Water esta funcionando corretamente', async () => {
    render(<App />);
    const inputNumber = screen.getByTestId(I_NUMBER);
    const buttonFiltrar = screen.getByTestId(B_FILTRAR);
    const columnSelect = screen.getByTestId(COLUMN_S);
    const comparisonSelect = screen.getByTestId(COMPARISON_S);

    userEvent.selectOptions(columnSelect, ['surface_water']);
    userEvent.selectOptions(comparisonSelect, ['maior que']);
    userEvent.type(inputNumber, '35');

    userEvent.click(buttonFiltrar);

    await waitFor(() => {
      const lines = screen.queryAllByTestId('tr');
      expect(lines.length).toBe(Number('3'));
    });
  });
});
