import "./style.css";

export type Pokemon = {
  name: string;
  types: string;
  imageUrl?: string;
  id: number;
};

type ApiResponseGetPokemon = {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
};

function generateUniqueRandomIds() {
  const randomNumbers = new Set<number>();
  while (randomNumbers.size < 10) {
    const number = Math.floor(Math.random() * 300) + 1;
    randomNumbers.add(number);
  }
  return Array.from(randomNumbers);
}

async function getPokemonById(id: number) {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id, { method: "GET" });
  if (!response.ok) throw Error("Fetch pokemon error!");
  return (await response.json()) as ApiResponseGetPokemon;
}

async function fetchPokemons() {
  try {
    const results = await Promise.all(generateUniqueRandomIds().map((id) => getPokemonById(id)));
    const pokemons: Pokemon[] = results.map((data) => ({
      id: data.id,
      name: data.name,
      imageUrl: data.sprites.front_default,
      types: data.types.map((item) => item.type.name).join(", "),
    }));
    return pokemons;
  } catch (error) {
    alert(error?.message);
  }
}

async function render() {
  const pokemons = await fetchPokemons();
  console.log(pokemons);
  // manipula html e renderiza pokemons
}

render();
