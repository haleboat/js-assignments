document.getElementById('load').addEventListener('click', callPokedexAPI)

const url = "https://pokeapi.co/api/v2/pokedex/1"

function callPokedexAPI() {
  removeLoadButton()
  initialLoading()

  fetch(url)
    .then(x => x.json())
    .then(data => {
      createPokedexHeader()
      createSearchbar()
      const list = data.pokemon_entries
      const pokedexList = document.createElement("ul")
      createListHeader(pokedexList)

      removeApiLoading()

      list.forEach(index => {
        createPokemonListHTML(index, pokedexList)
      });
    })
    .catch(err => {
      showError()
    })
}

function callPokemonEntryAPI(pokemonUrl) {
  showLoading()
  fetch(pokemonUrl)
    .then(x => x.json())
    .then(data => {
      const pokemon = data
      removeLoading()
      createPokemonCard(pokemon)
    })
    .catch(err => {
      showError()
    })
}

function callSpeciesAPI(speciesURL) {
  fetch(speciesURL)
    .then(x => x.json())
    .then(data => {
      let description = `Error loading description.`
      for (let i = 0; i < data.flavor_text_entries.length; i++) {
        if (data.flavor_text_entries[i].language.name === 'en') {
          description = data.flavor_text_entries[i].flavor_text
          break
        }
      }
      const descID = document.querySelector('#poke-desc')
      descID.textContent = description
    })
    .catch(err => {
      showError()
    })
}

function createPokedexHeader() {
  const container = document.querySelector('.container')
  const header = document.createElement('h1')
  header.textContent = 'pokedex'
  header.className = 'pokedex-title'
  container.appendChild(header)
}

function createSearchbar() {
  const container = document.querySelector('.container')
  const wrapper = document.createElement('div')
  const search = document.createElement('h3')
  const textField = document.createElement('input')
  wrapper.className = 'search'
  search.textContent = 'search'
  textField.className = 'search-term'
  textField.id = 'search-term'
  textField.placeholder = `type pokemons name here...`
  textField.type = 'text'

  wrapper.appendChild(search)
  wrapper.appendChild(textField)
  container.appendChild(wrapper)

  function searchJS() {
    let input = document.getElementById('search-term')
    let filter = input.value.toUpperCase()
    let ul = document.getElementById('pokemon-list')
    let li = ul.getElementsByTagName('li')

    for (let i = 1; i < li.length; i++) {
      let a = li[i].getElementsByTagName('a')[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = ''
      }
      else {
        li[i].style.display = 'none'
      }
    }
  }

  textField.addEventListener('keyup', searchJS)
}



function createListHeader(pokedexList) {
  const listHeader = document.createElement('li')
  const listHeaderNum = document.createElement('p')
  const listHeaderName = document.createElement('p')
  const listHeaderAction = document.createElement('p')

  listHeader.className = 'list-header'

  listHeaderNum.textContent = 'entry number:'
  listHeaderName.textContent = 'pokemon name'
  listHeaderAction.textContent = 'action'

  listHeader.appendChild(listHeaderNum)
  listHeader.appendChild(listHeaderName)
  listHeader.appendChild(listHeaderAction)
  pokedexList.appendChild(listHeader)
  pokedexList.id = "pokemon-list"
}

function createPokemonListHTML(data, ul) {
  const pokedexNum = data.entry_number
  const pokedexName = data.pokemon_species.name

  const container = document.querySelector('.container')
  const row = document.createElement('li')
  const entryNum = document.createElement('p')
  const pokemonName = document.createElement('a')
  const viewButton = document.createElement('button')

  row.id = pokedexNum
  entryNum.textContent = zeroPadding(pokedexNum)
  pokemonName.textContent = pokedexName
  pokemonName.id = pokedexName
  viewButton.value = `https://pokeapi.co/api/v2/pokemon/${pokedexName}/`
  viewButton.textContent = `view`
  viewButton.id = 'view'

  function loadEntry() {
    showCard()
    callPokemonEntryAPI(viewButton.value)
  }

  viewButton.addEventListener('click', loadEntry)
  row.appendChild(entryNum)
  row.appendChild(pokemonName)
  row.appendChild(viewButton)
  ul.appendChild(row)
  container.appendChild(ul)
}

function createPokemonCard(pokeData) {
  const id = pokeData.id
  const name = pokeData.name
  const sprite = pokeData.sprites.front_default
  const speciesURL = pokeData.species.url

  const entryID = document.querySelector('#poke-num')
  const nameID = document.querySelector('#poke-name')
  const typeID = document.querySelector('#poke-type')
  const typeIDtwo = document.querySelector('#poke-type2')
  const image = document.querySelector('.image')

  callSpeciesAPI(speciesURL)

  entryID.textContent = zeroPadding(id)
  nameID.textContent = name
  typeID.textContent = pokeData.types[0].type.name
  typeID.className = `${pokeData.types[0].type.name}`
  typeIDtwo.style.display = 'none'
  if (pokeData.types.length > 1) {
    typeIDtwo.textContent = pokeData.types[1].type.name
    typeIDtwo.className = `${pokeData.types[1].type.name}`
    typeIDtwo.style.display = ''
  }

  image.style = `background-image: url(${sprite})`
}

function removeLoadButton() {
  document.querySelector("#load").remove()
}

function hideList() {
  const list = document.querySelector('.pokemon-list')
  list.classList = 'pokemon-list hide'
}

function hideCard() {
  removeApiLoading()
  resetCard()
  const card = document.querySelector('.toggle')
  card.classList = 'toggle hide'
}

function showCard() {
  initialLoading()
  const card = document.querySelector('.toggle')
  card.classList = 'toggle show'
}

function resetCard() {
  document.querySelector('#poke-num').textContent = ''
  document.querySelector('#poke-name').textContent = ''
  document.querySelector('#poke-type').textContent = ''
  document.querySelector('#poke-type2').textContent = ''
  document.querySelector('.image').style = `background-image: none`
}

function initialLoading() {
  const loading = document.createElement("div")
  loading.id = "api-loading"
  loading.className = "loading"
  loading.textContent = "Loading..."
  document.querySelector('body').appendChild(loading)
}

function showLoading() {
  const loading = document.createElement("div")
  loading.id = "js-loading"
  loading.className = "loading-pokemon"
  loading.textContent = "Loading Pokemon..."
  document.querySelector('.wrapper').appendChild(loading)
}

function removeApiLoading() {
  const api_loading = document.querySelector("#api-loading")
  api_loading.remove()
}

function removeLoading() {
  const loading = document.querySelector("#js-loading")
  loading.remove()
}

function showError() {
  hideList()
  hideCard()
  const loading = document.createElement("p")
  loading.id = "js-error"
  loading.className = 'error'
  loading.textContent = "There was an error loading the data."
  document.querySelector('.container').appendChild(loading)
}

function zeroPadding(id) {
  if (id < 10) {
    return `#00${id}`
  } else if (id >= 10 && id < 100) {
    return `#0${id}`
  } else if (id >= 100) {
    return `#${id}`
  }
}