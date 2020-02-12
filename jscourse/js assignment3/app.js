const originalOneFifty = 151

function createPokemonListHTML(data) {

  // make card div
  const card = document.createElement("ul")
  card.className = "pokemon-list"

  // make entry number
  const pokedexNum = data.entry_number
  const entryNum = document.createElement("li")
  if (pokedexNum < 10) {
    entryNum.textContent = `#00${pokedexNum}`
  } else if (pokedexNum >= 10 && pokedexNum < 100) {
    entryNum.textContent = `#0${pokedexNum}`
  } else if (pokedexNum >= 100) {
    entryNum.textContent = `#${pokedexNum}`
  }

  // make pokemon name
  // capitalize in CSS with:
  //                        text - transform: capitalize;
  const pokemon = data.pokemon_species.name
  const pokeName = document.createElement("li")
  pokeName.textContent = pokemon

  // make link to pokemon
  const link = data.pokemon_species.url
  const pokemonURL = document.createElement('li')
  const viewButton = document.createElement('a')
  pokemonURL.appendChild(viewButton)

  viewButton.href = link
  viewButton.textContent = `View`

  // attach entry number to card
  card.appendChild(entryNum)

  // attach pokemon name to card
  card.appendChild(pokeName)

  // attach link to pokemon to card
  card.appendChild(pokemonURL)

  // attach card to page
  document.body.appendChild(card)
}

function showLoading() {
  const loading = document.createElement("p")
  loading.id = "js-loading"
  loading.textContent = "Loading..."
  document.body.appendChild(loading)
}

function removeLoading() {
  const loading = document.querySelector("#js-loading")
  loading.remove()
}

function showError() {
  const loading = document.createElement("p")
  loading.id = "js-error"
  loading.textContent = "The news stories seem to be unavailable right now :S"
  document.body.appendChild(loading)
}

function intialLoad() {
  const url = "https://pokeapi.co/api/v2/pokedex/1"

  showLoading()

  fetch(url)
    .then(x => x.json())
    .then(data => {
      const list = data.pokemon_entries
      removeLoading()

      list.forEach(index => {
        if (index.entry_number <= originalOneFifty) {
          createPokemonListHTML(index)
        }
      });

    })
    .catch(err => {
      showError()
    })

}

function entryLoad() {

}