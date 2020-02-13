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
  const pokedexName = data.pokemon_species.name
  const pokedexURL = data.pokemon_species.url


  const row = document.createElement('li')


  const entryNum = document.createElement("p")
  if (pokedexNum < 10) {
    entryNum.textContent = `#00${pokedexNum}`
  } else if (pokedexNum >= 10 && pokedexNum < 100) {
    entryNum.textContent = `#0${pokedexNum}`
  } else if (pokedexNum >= 100) {
    entryNum.textContent = `#${pokedexNum}`
  }

  const pokemonName = document.createElement("p")
  pokemonName.textContent = pokedexName

  // const buttonRow = document.createElement('p')
  const viewButton = document.createElement('button')

  viewButton.value = pokedexURL
  viewButton.textContent = `view`
  viewButton.id = 'view'
  // viewButton.addEventListener('click', entryLoad(button.value))

  // attach entry number <li> to <ul>
  row.appendChild(entryNum)

  // attach pokemon name <li> to <ul>
  row.appendChild(pokemonName)

  // attach button to view pokemon <li> to <ul>
  row.appendChild(viewButton)

  ul.appendChild(row)

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

  //   let entryNum = ''

    // if (pokedexNum < 10) {
    //   entryNum = `#00${pokedexNum}`
    // } else if (pokedexNum >= 10 && pokedexNum < 100) {
    //   entryNum = `#0${pokedexNum}`
    // } else if (pokedexNum >= 100) {
    //   entryNum = `#${pokedexNum}`
    // }

  //   const li = ` <li>${entryNum}</li>
  //                 <li>${pokemonName}</li>
  //                 <li><button value=${pokemonURL} id='view'>View</button></li>
  //               `

  //   return li
  // }