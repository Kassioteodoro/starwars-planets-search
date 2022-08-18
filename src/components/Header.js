import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

export default function Header() {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [numberFilter, setNumberFilter] = useState('0');

  const {
    filterText: {
      filterByName: { name },
    },
    setFilterText,
    setFilterNumber,
    filterNumber: { filterByNumericValues },
    options,
    setOptions,
  } = useContext(AppContext);

  const setInputName = ({ target: { value } }) => {
    setFilterText({ filterByName: { name: value } });
  };

  const setSelectColumn = ({ target: { value } }) => {
    setColumn(value);
  };

  const setSelectComparison = ({ target: { value } }) => {
    setComparison(value);
  };

  const setInputNumber = ({ target: { value } }) => {
    setNumberFilter(value);
  };

  const saveFilterData = () => {
    setFilterNumber({
      filterByNumericValues: [...filterByNumericValues,
        { column, comparison, value: numberFilter }] });
    const removeOption = options.filter((option) => option !== column);
    setOptions(removeOption);
    setColumn('population');
    setComparison('maior que');
    setNumberFilter('0');
  };

  const setRemoveFilter = ({ target: { id } }) => {
    const removeFilter = filterByNumericValues.filter((filter) => filter.column !== id);
    setFilterNumber({ filterByNumericValues: removeFilter });
    setOptions([...options, id]);
  };

  const setRemoveAllFilter = () => {
    setFilterNumber({ filterByNumericValues: [] });
    setOptions([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  };

  return (
    <div>
      <section>
        <input
          data-testid="name-filter"
          type="text"
          value={ name }
          onChange={ setInputName }
        />
      </section>
      <section>
        <select
          data-testid="column-filter"
          value={ column }
          onChange={ setSelectColumn }
        >
          {options.map((option) => (
            <option key={ option } value={ option }>
              {option}
            </option>
          ))}
        </select>
        <select
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ setSelectComparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          value={ numberFilter }
          onChange={ setInputNumber }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ saveFilterData }
        >
          FILTRAR
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ setRemoveAllFilter }
        >
          REMOVER FILTROS
        </button>
      </section>
      <section>
        {filterByNumericValues.map((filter) => (
          <label key={ filter.column } htmlFor={ filter.column }>
            {`${filter.column} `}
            {`${filter.comparison} `}
            {`${filter.value}`}
            <button type="button" id={ filter.column } onClick={ setRemoveFilter }>
              remove
            </button>
          </label>
        ))}
      </section>
    </div>
  );
}
