const pokemonPromises=[]
async function fetchAllPokemons (){
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    for (let i=1; i<=898;i++){
        const poke= await fetch(getPokemonUrl(i));
        if (poke.ok){
            pokemonPromises.push(poke.json());  
        }
    }
    Promise.all(pokemonPromises)
        .then(pokemons=>{
            const searchBar=document.getElementById('searchBar');
                searchBar.addEventListener('keyup',(e)=>{
                    const searchString=e.target.value;
                    const filteredPokemons=pokemons.filter((pokemon)=>{
                        let pokedex = document.getElementById("pokedex");
                        empty(pokedex);
                        return pokemon.name.includes(searchString)
                    })
                    //console.log(filteredPokemons)
                    filteredPokemons.forEach(pokemon=>{
                        const types=pokemon.types.map(typeInfo =>typeInfo.type.name)
                        const ul=document.querySelector('#pokedex')
        
                        const typeCard=document.createElement('li')
                        typeCard.classList=`card ${types[0]}`
        
                        const imageCard=document.createElement('img')
                        imageCard.classList="card-image"
                        imageCard.alt=`${pokemon.name}`
                        imageCard.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
        
                        const pokeName=document.createElement('h2')
                        pokeName.classList="card-title"
                        pokeName.textContent=`${pokemon.id} ${pokemon.name}`
        
                        const pokeType=document.createElement('p')
                        pokeType.classList="card-subtitle"
                        pokeType.textContent=`${types.join(' / ')}`
                        
                        const pokeStatsStats=pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`)
                        const pokeStatp=document.createElement('p')
                        pokeStatp.textContent=`${pokeStatsStats.join(" | ")}`
                        

                    ul.append(typeCard)  
                    typeCard.append(imageCard,pokeName,pokeType,pokeStatp)
                    })
                   
                })
    })
}

fetchAllPokemons()
function empty(element) {
    while(element.firstElementChild) {
       element.firstElementChild.remove();
    }
  }