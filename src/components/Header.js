import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

export default function Header() {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [numberFilter, setNumberFilter] = useState('0');

  const { filterText: { filterByName: { name } },
    setFilterText, setFilterNumber } = useContext(AppContext);

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
      filterByNumericValues: [{ column, comparison, value: numberFilter }] });
    setColumn('population');
    setComparison('maior que');
    setNumberFilter('0');
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
          <option value="population">population</option>
          <option value="orbital_period">orbital period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation period</option>
          <option value="surface_water">surface water</option>
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
      </section>
    </div>
  );
}
