pokemonApp = {};

pokemonApp.placeholder = {
    img: "./assets/pokeball.png",
    alt: "photo of pokeball",
    name: "Pokeball",
    type: "????????",
    abilities: "??????????"
}

pokemonApp.typeIcon = [
    { bug: "./assets/pokemon-type-icon/Bug.webp" },
    { dark: "./assets/pokemon-type-icon/Dark.webp" },
    { dragon: "./assets/pokemon-type-icon/Dragon.webp" },
    { electric: "./assets/pokemon-type-icon/Electric.webp" },
    { fariy: "./assets/pokemon-type-icon/Fairy.webp" },
    { fighting: "./assets/pokemon-type-icon/Fighting.webp" },
    { fire: "./assets/pokemon-type-icon/Fire.webp" },
    { flying: "./assets/pokemon-type-icon/Flying.webp" },
    { ghost: "./assets/pokemon-type-icon/Ghost.webp" },
    { grass: "./assets/pokemon-type-icon/Grass.webp" },
    { ground: "./assets/pokemon-type-icon/Ground.webp" },
    { ice: "./assets/pokemon-type-icon/Ice.webp" },
    { normal: "./assets/pokemon-type-icon/Normal.webp" },
    { poison: "./assets/pokemon-type-icon/Poison.webp" },
    { psychic: "./assets/pokemon-type-icon/Psychic.webp" },
    { rock: "./assets/pokemon-type-icon/Rock.webp" },
    { steel: "./assets/pokemon-type-icon/Steel.webp" },
    { water: "./assets/pokemon-type-icon/Water.webp" }
]


pokemonApp.url = 'https://pokeapi.co/api/v2/pokemon?limit=898';

pokemonApp.btn = document.querySelector('.randomBtn')
pokemonApp.img = document.querySelector('.imgContainer')
pokemonApp.name = document.querySelector('.pokemonName')
pokemonApp.type = document.querySelector('.pokemonType')
pokemonApp.abilities = document.querySelector('.pokemonAbilities')

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
        // pokemonApp.img.classList.add('fade')
        pokemonApp.img.innerHTML = '';
        pokemonApp.name.innerHTML = '';
        pokemonApp.type.innerHTML = '';
        pokemonApp.abilities.innerHTML = '';

    });
};

pokemonApp.displayPokemon = (jsonResults2) => {

    const imgElement = document.createElement('img')
    const nameElement = document.createElement('h2')

    const arrayListOfType = jsonResults2.types
    arrayListOfType.forEach((arrayTypes) => {
        const typeElement = document.createElement('li')
        typeElement.innerHTML = arrayTypes.type.name
        pokemonApp.type.appendChild(typeElement);
    });

    const arrayListOfAbilities = jsonResults2.abilities;
    arrayListOfAbilities.forEach((arrayAbilities) => {
        const abilitiesElement = document.createElement('li')
        abilitiesElement.innerHTML = arrayAbilities.ability.name
        pokemonApp.abilities.appendChild(abilitiesElement);
    });

    imgElement.src = jsonResults2.sprites.other['official-artwork'].front_default
    imgElement.alt = `photo of ${jsonResults2.name}`
    nameElement.innerHTML = jsonResults2.name

    pokemonApp.img.appendChild(imgElement);
    pokemonApp.name.appendChild(nameElement);
    // pokemonApp.img.classList.remove('fade')

};

pokemonApp.init = () => {
    pokemonApp.getAllPokemon();
};

pokemonApp.init();