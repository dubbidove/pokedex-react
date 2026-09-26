import axios from 'axios'
import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [value, setValue] = useState()
  const [pokemon, setPokemon] = useState()
  const [pokemonList, setPokemonList] = useState([])

  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`

  function handleButton() {
    axios.get(url).then((response) => {
      setValue(response.data)
    })
  }

  function handleInputChange(event) {
    setPokemon(event.target.value)
  }

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151').then((response) => {
        setPokemonList(response.data.results)
      })
  }, [])

  return (
    <div>
      <h1>POKEDEX</h1>
      <input type="text" value={pokemon || ''} onChange={handleInputChange}/>

      <button onClick={handleButton}>
        Fetch Pokemon
      </button>

      <div>
        <p className="pokemon-search">Pokemon name: {value?.name}</p>
        <p className="pokemon-search">Pokemon ID: {value?.id}</p>

        {value?.id && (
          <img className="pokemon-img"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${value.id}.png`}
          />
        )}
      </div>

      <hr />
      <div className="pokemon-container">
        {pokemonList.map((pokemon, index) => (
          <div className="card" key={pokemon.name}>
            <h3 className="name">{pokemon.name}</h3>
            <p className="name">ID: {index + 1}</p>

            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
