export default async function FetchPlanets() {
  const require = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const processed = await require.json();
  const { results } = processed;
  const filter = results.map((planet) => {
    delete planet.residents;
    return planet;
  });
  return filter;
}
