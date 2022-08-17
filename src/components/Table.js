import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Table() {
  const {
    planets,
    filterText: {
      filterByName: { name },
    },
    filterNumber: { filterByNumericValues },
  } = useContext(AppContext);
  const { column, comparison, value } = filterByNumericValues[0];
  console.log(column, comparison, value);
  return (
    <table>
      <thead>
        <th>Name</th>
        <th>Rotation Period</th>
        <th>Orbital Period</th>
        <th>Diameter</th>
        <th>Climate</th>
        <th>Gravity</th>
        <th>Terrain</th>
        <th>Surface Water</th>
        <th>Population</th>
        <th>Films</th>
        <th>Created</th>
        <th>Edited</th>
        <th>URL</th>
      </thead>
      <tbody>
        {planets
          .filter((planet) => planet.name.includes(name))
          .filter((planet) => {
            if (comparison === 'maior que') {
              return Number(planet[column]) > Number(value);
            } if (comparison === 'menor que') {
              return Number(planet[column]) < Number(value);
            } if (comparison === 'igual a') {
              return Number(planet[column]) === Number(value);
            }
            return planet;
          })
          .map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
