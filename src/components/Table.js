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
  return (
    <table>
      <thead>
        <tr>
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
        </tr>
      </thead>
      <tbody>
        {planets
          .filter((planet) => planet.name.includes(name))
          .filter((planet) => {
            if (
              filterByNumericValues.some((info) => info.column === 'population')
            ) {
              const data = filterByNumericValues.find(
                ({ column }) => column === 'population',
              );
              if (data.comparison === 'maior que') {
                return Number(planet.population) > Number(data.value);
              }
              if (data.comparison === 'menor que') {
                return Number(planet.population) < Number(data.value);
              }
              if (data.comparison === 'igual a') {
                return Number(planet.population) === Number(data.value);
              }
            }
            return planet;
          })
          .filter((planet) => {
            if (
              filterByNumericValues.some(
                (info) => info.column === 'orbital_period',
              )
            ) {
              const data = filterByNumericValues.find(
                ({ column }) => column === 'orbital_period',
              );
              if (data.comparison === 'maior que') {
                return Number(planet.orbital_period) > Number(data.value);
              }
              if (data.comparison === 'menor que') {
                return Number(planet.orbital_period) < Number(data.value);
              }
              if (data.comparison === 'igual a') {
                return Number(planet.orbital_period) === Number(data.value);
              }
            }
            return planet;
          })
          .filter((planet) => {
            if (
              filterByNumericValues.some((info) => info.column === 'diameter')
            ) {
              const data = filterByNumericValues.find(
                ({ column }) => column === 'diameter',
              );
              if (data.comparison === 'maior que') {
                return Number(planet.diameter) > Number(data.value);
              }
              if (data.comparison === 'menor que') {
                return Number(planet.diameter) < Number(data.value);
              }
              if (data.comparison === 'igual a') {
                return Number(planet.diameter) === Number(data.value);
              }
            }
            return planet;
          })
          .filter((planet) => {
            if (
              filterByNumericValues.some(
                (info) => info.column === 'rotation_period',
              )
            ) {
              const data = filterByNumericValues.find(
                ({ column }) => column === 'rotation_period',
              );
              if (data.comparison === 'maior que') {
                return Number(planet.rotation_period) > Number(data.value);
              }
              if (data.comparison === 'menor que') {
                return Number(planet.rotation_period) < Number(data.value);
              }
              if (data.comparison === 'igual a') {
                return Number(planet.rotation_period) === Number(data.value);
              }
            }
            return planet;
          })
          .filter((planet) => {
            if (
              filterByNumericValues.some(
                (info) => info.column === 'surface_water',
              )
            ) {
              const data = filterByNumericValues.find(
                ({ column }) => column === 'surface_water',
              );
              if (data.comparison === 'maior que') {
                return Number(planet.surface_water) > Number(data.value);
              }
              if (data.comparison === 'menor que') {
                return Number(planet.surface_water) < Number(data.value);
              }
              if (data.comparison === 'igual a') {
                return Number(planet.surface_water) === Number(data.value);
              }
            }
            return planet;
          })
          .map((planet) => (
            <tr key={ planet.name } data-testid="tr">
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
