// Namespace for pokemon app
pokemonApp = {};

// Object for initial load of page 
pokemonApp.placeholder = {
    img: "./assets/pokeball.png",
    alt: "photo of pokeball",
    name: "Pokeball",
    type: "?????",
    abilities: "?????"
}

// Icons that represent the type of pokemon
pokemonApp.typeIcon = {
    bug: "./assets/pokemon-type-icon/Bug.webp",
    dark: "./assets/pokemon-type-icon/Dark.webp",
    dragon: "./assets/pokemon-type-icon/Dragon.webp",
    electric: "./assets/pokemon-type-icon/Electric.webp",
    fairy: "./assets/pokemon-type-icon/Fairy.webp",
    fighting: "./assets/pokemon-type-icon/Fighting.webp",
    fire: "./assets/pokemon-type-icon/Fire.webp",
    flying: "./assets/pokemon-type-icon/Flying.webp",
    ghost: "./assets/pokemon-type-icon/Ghost.webp",
    grass: "./assets/pokemon-type-icon/Grass.webp",
    ground: "./assets/pokemon-type-icon/Ground.webp",
    ice: "./assets/pokemon-type-icon/Ice.webp",
    normal: "./assets/pokemon-type-icon/Normal.webp",
    poison: "./assets/pokemon-type-icon/Poison.webp",
    psychic: "./assets/pokemon-type-icon/Psychic.webp",
    rock: "./assets/pokemon-type-icon/Rock.webp",
    steel: "./assets/pokemon-type-icon/Steel.webp",
    water: "./assets/pokemon-type-icon/Water.webp"
}

// Icons that represent the abilities 
pokemonApp.abilitiesIcon = {
    1:"./assets/abilities-icons/Successor_Bronze.webp",
    2:"./assets/abilities-icons/Successor_Silver.webp",
    3:"./assets/abilities-icons/Successor_Platinum.webp",
}


// Getting inital load content on page 
pokemonApp.url = 'https://pokeapi.co/api/v2/pokemon?limit=898';

pokemonApp.btn = document.querySelector('.randomBtn')
pokemonApp.img = document.querySelector('.imgContainer')
pokemonApp.name = document.querySelector('.pokemonName')
pokemonApp.type = document.querySelector('.pokemonType')
pokemonApp.abilities = document.querySelector('.pokemonAbilities')
pokemonApp.id = document.querySelector('.pokemonId')

window.addEventListener("DOMContentLoaded", () => {
    const placeholder = pokemonApp.placeholder
    const imgElementHolder = document.createElement('img')
    const nameElementHolder = document.createElement('h2')
    const typeElementHolder = document.createElement('li')
    const abilitiesElementHolder = document.createElement('li')

    imgElementHolder.src = placeholder.img
    imgElementHolder.alt = placeholder.alt
    nameElementHolder.innerHTML = placeholder.name
    typeElementHolder.innerHTML = placeholder.type
    abilitiesElementHolder.innerHTML = placeholder.abilities


    pokemonApp.img.appendChild(imgElementHolder);
    pokemonApp.name.appendChild(nameElementHolder);
    pokemonApp.type.appendChild(typeElementHolder);
    pokemonApp.abilities.appendChild(abilitiesElementHolder);
});

// API call that gets the entire list of pokemon
pokemonApp.getAllPokemon = () => {
    fetch(pokemonApp.url).then((res) => {
        return res.json()
    }).then((jsonData) => {
        pokemonApp.getRandom(jsonData.results)

    });
};

// Second API call that will get our random pokemon and info
pokemonApp.getRandom = (jsonResults1) => {
    pokemonApp.btn.addEventListener('click', function () {
        randomNum = Math.floor(Math.random() * jsonResults1.length)
        fetch(jsonResults1[randomNum].url).then((res) => {
            return res.json()
        }).then((jsonData) => {
            pokemonApp.img.innerHTML = '';
            pokemonApp.name.innerHTML = '';
            pokemonApp.type.innerHTML = '';
            pokemonApp.abilities.innerHTML = '';
            pokemonApp.id.innerHTML = '';
            pokemonApp.displayPokemon(jsonData);
        });

    });
};

// Displaying all pokemon content from API
pokemonApp.displayPokemon = (jsonResults2) => {
    // Displaying type 
    
    const arrayListOfType = jsonResults2.types
    
    arrayListOfType.forEach((arrayTypes) => {
        const iconLiElement = document.createElement('li')
        
        // If statement for type icon
        for (let item in pokemonApp.typeIcon) {
            if (item === arrayTypes.type.name) {
                iconLiElement.innerHTML = `<img class="icon" src=${pokemonApp.typeIcon[item]} alt="icon for ${item} types">`
                iconLiElement.appendChild(document.createTextNode(item));
                pokemonApp.type.appendChild(iconLiElement);
            }
        }
        
    });
    
    // Displaying abilities
    const arrayListOfAbilities = jsonResults2.abilities;
    
    arrayListOfAbilities.forEach((arrayAbilities) => {
        const abilitiesLiElement = document.createElement('li')
        
        // If statment for abilites icon
        for (let item in pokemonApp.abilitiesIcon) {
            if (item == arrayAbilities.slot) {
                abilitiesLiElement.innerHTML = `<img class="icon" src=${pokemonApp.abilitiesIcon[item]} alt="abilities icon">`
                abilitiesLiElement.appendChild(document.createTextNode(arrayAbilities.ability.name));
                pokemonApp.abilities.appendChild(abilitiesLiElement);
            }
        }
        
    });
    
    // Displaying images  
    const imgElement = document.createElement('img')
    imgElement.src = jsonResults2.sprites.other['official-artwork'].front_default
    imgElement.alt = `photo of ${jsonResults2.name}`
    pokemonApp.img.appendChild(imgElement);
    
    // Displayiing name
    const nameElement = document.createElement('h2')
    nameElement.innerHTML = jsonResults2.name
    pokemonApp.name.appendChild(nameElement);
    
    // Displaing ID# 
    const idElement = document.createElement('h4')
    idElement.innerText = `#${jsonResults2.id}`
    pokemonApp.id.appendChild(idElement);
    
};

// Init Function
pokemonApp.init = () => {
    pokemonApp.getAllPokemon();
};

// Calling Init
pokemonApp.init();