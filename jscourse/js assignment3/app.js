document.getElementById('load').addEventListener('click', initialLoad)
// button.addEventListener('click', entryLoad(button.value))

const originalOneFifty = 151
const url = "https://pokeapi.co/api/v2/pokedex/1"

function initialLoad() {

  document.querySelector("#load").remove()
  showLoading()

  fetch(url)
    .then(x => x.json())
    .then(data => {
      const list = data.pokemon_entries

      const ul = pokedexList = document.createElement("ul")
      pokedexList.className = "pokemon-list"

      removeLoading()

      list.forEach(index => {
        if (index.entry_number <= originalOneFifty) {
          createPokemonListHTML(index, ul)
        }
      });

    })
    .catch(err => {
      showError()
    })
}

function entryLoad(pokemonUrl) {
  fetch(pokemonUrl)
    .then(x => x.json())
    .then(data => {
      const pokemon = data
      // removeLoading()

      // createPokemonData(pokemon)
      console.log(pokemon)

    })
    .catch(err => {
      // showError()
    })
}

// function createListHTML() {
//   const pokedexList = document.createElement("ul")
//   pokedexList.className = "pokemon-list"

//   return pokedexList
// }

function createPokemonListHTML(data, ul) {
  const pokedexNum = data.entry_number
  const pokemonName = data.pokemon_species.name
  const pokemonURL = data.pokemon_species.url

  const entryNumRow = document.createElement("li")
  if (pokedexNum < 10) {
    entryNumRow.textContent = `#00${pokedexNum}`
  } else if (pokedexNum >= 10 && pokedexNum < 100) {
    entryNumRow.textContent = `#0${pokedexNum}`
  } else if (pokedexNum >= 100) {
    entryNumRow.textContent = `#${pokedexNum}`
  }

  const pokemonNameRow = document.createElement("li")
  pokemonNameRow.textContent = pokemonName

  const buttonRow = document.createElement('li')
  const viewButton = document.createElement('button')

  viewButton.value = pokemonURL
  viewButton.textContent = `view`
  viewButton.id = 'view'
  // viewButton.addEventListener('click', entryLoad(button.value))
  buttonRow.appendChild(viewButton)


  // attach entry number <li> to <ul>
  ul.appendChild(entryNumRow)

  // attach pokemon name <li> to <ul>
  ul.appendChild(pokemonNameRow)

  // attach button to view pokemon <li> to <ul>
  ul.appendChild(buttonRow)

  // attach ul to document
  document.querySelector('.container').appendChild(ul)
}

// function createPokemonData(pokeData) {
//   console.log(pokeData)
// }

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
  loading.textContent = "There was an error loading the data."
  document.body.appendChild(loading)
}

// function initialLoad() {
// const url = "https://pokeapi.co/api/v2/pokedex/1"

// showLoading()

// fetch(url)
//   .then(x => x.json())
//   .then(data => {
//     const list = data.pokemon_entries
//     // removeLoading()

//     list.forEach(index => {
//       if (index.entry_number <= originalOneFifty) {
//         createPokemonListHTML(index)
//       }
//     });

//   })
//   .catch(err => {
//     // showError()
//   })
// }


// trying old for loop to only return li's
// for (let i = 0; i <= originalOneFifty; i++) {
  //   console.log(data[i])
  //   const pokedexNum = data[i - 1].entry_number
  //   const pokemonName = data[i - 1].pokemon_species.name
  //   const pokemonURL = data[i - 1].pokemon_species.url

  //   let entryNumRow = ''

    // if (pokedexNum < 10) {
    //   entryNumRow = `#00${pokedexNum}`
    // } else if (pokedexNum >= 10 && pokedexNum < 100) {
    //   entryNumRow = `#0${pokedexNum}`
    // } else if (pokedexNum >= 100) {
    //   entryNumRow = `#${pokedexNum}`
    // }

  //   const li = ` <li>${entryNumRow}</li>
  //                 <li>${pokemonName}</li>
  //                 <li><button value=${pokemonURL} id='view'>View</button></li>
  //               `

  //   return li
  // }