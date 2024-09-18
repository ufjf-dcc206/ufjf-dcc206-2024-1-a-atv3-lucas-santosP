const templatePokemonCard = document.createElement("template");
templatePokemonCard.innerHTML = `
<style>
.pokemon-card {
  background-color: #fff;
  border: 4px solid rebeccapurple;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 220px;
  text-align: center;
  padding: 20px;
  margin: 20px auto;
  font-family: 'Arial', sans-serif;
  transition: transform 0.3s ease;
}

.pokemon-card:hover {
  transform: scale(1.05);
}

#image {
  width: 150px;
  height: 150px;
  object-fit: contains;
  margin-bottom: 10px;
}

#name {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
}

#types {
  font-weight: 500;
  margin-top: 10px;
  background-color:#333;
  padding: 5px 10px;
  border-radius: 12px;
  color: #fff;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
}
</style>

<div class="pokemon-card">
  <img id="image" alt="Pokemon image"/>
  <p id="name"></p>
  <p id="types"></p>
</div>
`;

export class PokemonCard extends HTMLElement {
  shadowRoot: ShadowRoot;
  #name: string = "";
  #imageUrl: string = "";
  #types: string = "";

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "closed" });
    this.shadowRoot.append(templatePokemonCard.content.cloneNode(true));
  }

  connectedCallback() {
    console.log("connected");
    this.#render();
  }

  #render() {
    this.shadowRoot.querySelector("#name")!.textContent = this.name;
    this.shadowRoot.querySelector("#types")!.textContent = this.types;
    (this.shadowRoot.querySelector("#image") as HTMLImageElement).src = this.imageUrl;
  }

  static get observedAttributes(): string[] {
    return ["name", "image-url", "types"];
  }

  get name() {
    return this.#name;
  }

  set name(value: string) {
    this.#name = value;
    this.#render();
  }

  get types() {
    return this.#types;
  }

  set types(value: string) {
    this.#types = value;
    this.#render();
  }

  get imageUrl() {
    return this.#imageUrl;
  }

  set imageUrl(value: string) {
    this.#imageUrl = value;
    this.#render();
  }

  attributeChangedCallback(key: string, oldValue?: string, newValue?: string) {
    if (oldValue === newValue) return;
    if (key === "name" && newValue) this.name = newValue;
    if (key === "types" && newValue) this.types = newValue;
    if (key === "image-url" && newValue) this.imageUrl = newValue;
  }
}
