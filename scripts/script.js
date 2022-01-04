pokemonApp = {};

pokemonApp.url = 'https://pokeapi.co/api/v2/pokemon?limit=898';

pokemonApp.btn = document.querySelector('.randomBtn')
pokemonApp.img = document.querySelector('.imgContaniner')
pokemonApp.name = document.querySelector('.pokemonName')
pokemonApp.type = document.querySelector('.pokemonType')
pokemonApp.Abilitys = document.querySelector('.pokemonAbilitys')

pokemonApp.getAllPokemon = () => {
    fetch(pokemonApp.url).then((res) => {
        return res.json()
    }).then((jsonData) => {
        pokemonApp.getRandom(jsonData.results)

    });
};


pokemonApp.getRandom = (jsonResults1) => {
    pokemonApp.btn.addEventListener('click', function () {
        randomNum = Math.floor(Math.random() * jsonResults1.length)
        fetch(jsonResults1[randomNum].url).then((res) => {
            return res.json()
        }).then((jsonData) => {
            pokemonApp.displayPokemon(jsonData)
        });
        pokemonApp.img.innerHTML = '';
        pokemonApp.name.innerHTML = '';
        pokemonApp.type.innerHTML = '';

    });
};

pokemonApp.displayPokemon = (jsonResults2) => {
    
    const imgElement = document.createElement('img')
    const nameElement = document.createElement('h2')
    const arrayListOfType = jsonResults2.types
        arrayListOfType.forEach((arrayTypes) => {
           const typeElement = document.createElement('p')
           typeElement.innerHTML = arrayTypes.type.name
           pokemonApp.type.appendChild(typeElement);
    })

    
    
    imgElement.src = jsonResults2.sprites.other['official-artwork'].front_default
    nameElement.innerHTML = jsonResults2.name
   
    
    pokemonApp.img.appendChild(imgElement);
    pokemonApp.name.appendChild(nameElement);
  


};

pokemonApp.init = () => {
    pokemonApp.getAllPokemon();
};

pokemonApp.init();