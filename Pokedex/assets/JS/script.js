const poke_container = document.getElementById('poke-container')
const pokemon_count = 151

const colors = {
    fire: '#cd9570',
    grass: '#70cd76',
    electric: '#d1ad49',
    water: '#70a3cd',
    ground: '#946453',
    rock: '#8f8383',
    fairy: '#ed9dd9',
    poison: '#88ab67',
    bug: '#a7f26d',
    dragon: '#97b3e6',
    psychic: '#997dd1',
    flying: '#f2dda2',
    fighting: '#e07070',
    ghost:'#a070cd',
    ice:'#70bdcd',
    normal: '#b8ad84'
}

const main_types = Object.keys(colors)
console.log(main_types)

const fetchPokemons = async () => {
    for(let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    createPokemonCard(data)
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)

    const id = pokemon.id.toString().padStart(3, '0')

    const poke_types = pokemon.types.map(type => type.type.name)
    const type = main_types.find(type => poke_types.indexOf(type) == 0)
    let type_2 = main_types.find(type => poke_types.indexOf(type) == 1)

    console.log(id, type, type_2)

    const color = colors[type];

    pokemonEl.style.backgroundColor = color;

    for(let i = 1; i <= pokemon_count; i++) {
        if(type == type_2){
            type_2 = ""
        }
        if(type_2 == undefined){
            const pokemonInnerHTML = `
                <div class="img-container">
                        <img id="no_int" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}">
                    </div>
                    <a href="#" class="modal">
                        <div class="info">
                            <span class="number">#${id}</span>
                            <h3 class="name">${name}</h3>
                            <small class="type"><span>${type}</span></small>    
                        </div> 
                    </a>
                </div>
                `
                pokemonEl.innerHTML = pokemonInnerHTML
    
                poke_container.appendChild(pokemonEl)
                
        }else{
            const pokemonInnerHTML = `
                <div class="img-container">
                        <img id="no_int" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}">
                    </div>
                    <div class="info">
                        <a href class="modal">
                            <span class="number">#${id}</span>
                            <h3 class="name">${name}</h3>
                            <small class="type"><span>${type}</span> <span>${type_2}</span> </small>
                        </a>
                    </div> 
                </div>
                `
                pokemonEl.innerHTML = pokemonInnerHTML
    
                poke_container.appendChild(pokemonEl)
        }
    }  
}

fetchPokemons()