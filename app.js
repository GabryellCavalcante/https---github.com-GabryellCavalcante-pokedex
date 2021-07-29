const getPokemonUrl = name => `https://pokeapi.co/api/v2/pokemon/${name}`

const fetchPokemon = () => {  

    const generatePokemonPromises = () => {}
    
    const pokemonPromises = []

    const pesquisaPokemon = (
            `
            <form>
                <input type="search" id="texto" method="get"> 
                <button type="submit" id="texto">Pesquisar</button>
            </form>
            `
    )
        


    for (let i=1; i <= 3; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromises).then(pokemons => {

        const lisPokemons = pokemons.reduce((accumulator,pokemon) => {
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)   

            accumulator += `
                <li class="card ${types[0]}">
                <img class="card-image" alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"/>
                    <h2 class="card-title"> ${pokemon.id}. ${pokemon.name} </h2>
                    <p class="card-subtitle"> ${types.join(' | ')} </p>
                </li>
            `
            return accumulator

        }, '')

        const p = document.querySelector('[data-js="searchPokemon"]')
        p.innerHTML = pesquisaPokemon

        const ul = document.querySelector('[data-js="pokedex"]')
        ul.innerHTML = lisPokemons

          
    })
    console.log(pesquisaPokemon)
}

fetchPokemon ()