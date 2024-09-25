import { PokemonCard } from "./components/pokemon-card";
import "./style.css";

export type Pokemon = {
  id: number;
  name: string;
  types: string;
  imageUrl: string;
};

type ApiResponseGetPokemon = {
  id: number;
  name: string;
  sprites: { other: { "official-artwork": { front_default: string } } };
  types: { type: { name: string } }[];
};

customElements.define("pokemon-card", PokemonCard);

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
  const results = await Promise.all(generateUniqueRandomIds().map((id) => getPokemonById(id)));

  const pokemons: Pokemon[] = results.map((data) => ({
    id: data.id,
    name: data.name,
    imageUrl: data.sprites.other["official-artwork"].front_default,
    types: data.types.map((item) => item.type.name).join(", "),
  }));
  console.log(pokemons);

  return pokemons;
}

function createPokemonElement(pokemon: Pokemon) {
  const element = document.createElement("pokemon-card");
  element.setAttribute("name", pokemon.name);
  element.setAttribute("types", pokemon.types);
  element.setAttribute("image-url", pokemon.imageUrl);
  return element;
}

async function render() {
  const pokemons = await fetchPokemons();
  const topPlayerRow = document.querySelectorAll("#top-player>div")!;
  const bottomPlayerRow = document.querySelectorAll("#bottom-player>div")!;
  const middleBoardRow = document.querySelectorAll("#middle-board>div")!;

  const pokemonsAtTop = pokemons.slice(0, 5);
  const pokemonsAtBottom = pokemons.slice(5);
  topPlayerRow.forEach((cardSlot, index) => {
    const pokemon = createPokemonElement(pokemonsAtTop[index]);
    cardSlot.appendChild(pokemon);

    pokemon.addEventListener("click", () => {
      middleBoardRow[index].appendChild(pokemon);
      cardSlot.innerHTML = "";
    });
  });

  bottomPlayerRow.forEach((cardSlot, index) => {
    const pokemon = createPokemonElement(pokemonsAtBottom[index]);
    cardSlot.appendChild(pokemon);

    pokemon.addEventListener("click", () => {
      middleBoardRow[index].appendChild(pokemon);
      cardSlot.innerHTML = "";
    });
  });
}

render();
