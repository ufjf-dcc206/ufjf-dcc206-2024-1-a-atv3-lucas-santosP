const templatePokemonCard = document.createElement("template");
templatePokemonCard.innerHTML = `
<style>
.pokemon-card {
  box-sizing:border-box;
  display: flex;
  flex-direction: column;
  width: 135px;
  height: 180px;
  padding: 12px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Arial', sans-serif;
  transition: transform 0.3s ease;
}

.pokemon-card:hover img {
  transform: scale(1.2);
  transition: transform 0.4s ease;
}

#image {
  width: 100%;
  height: 80px;
  object-fit: contains;
  margin-bottom: 10px;
}

#name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 6px;
}

#types {
  font-size: 10px;
  font-weight: 500;
  margin-top: 10px;
  background-color:#333;
  padding: 5px 10px;
  border-radius: 12px;
  color: #fff;
  text-transform: uppercase;
  font-weight: semi-bold;
}
</style>

<div class="pokemon-card">
  <img id="image" alt="Pokemon image"/>
  <span id="name"></span>
  <span id="types"></span>
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
