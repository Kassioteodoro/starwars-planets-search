import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FetchPlanets from '../services/FetchPlanets';
import AppContext from './AppContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterText, setFilterText] = useState({ filterByName: { name: '' } });
  const [filterNumber, setFilterNumber] = useState({
    filterByNumericValues: [] });
  const [options, setOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  const requestPlanets = async () => {
    const planetsList = await FetchPlanets();
    setPlanets(planetsList);
  };

  useEffect(() => {
    requestPlanets();
  }, []);

  const contextValue = {
    planets,
    setPlanets,
    filterText,
    setFilterText,
    filterNumber,
    setFilterNumber,
    options,
    setOptions,
  };

  return (
    <AppContext.Provider value={ contextValue }>{children}</AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
