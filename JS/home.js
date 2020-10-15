const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minEl = document.getElementById('min');
const secEl = document.getElementById('sec');

const firstDay = '07 May 2021 00:00';

function countdown() {
    const currentDay = new Date();
    const firstDayHack = new Date(firstDay);

    const totalSeconds = (firstDayHack - currentDay) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);

    const hours = Math.floor(totalSeconds / 3600) % 24;

    const minutes = Math.floor(totalSeconds / 60) % 60;

    const seconds = Math.floor(totalSeconds % 60);

    daysEl.innerHTML = days;
    hoursEl.innerHTML = hours;
    minEl.innerHTML = minutes;
    secEl.innerHTML = seconds;

}

countdown();
setInterval(countdown, 1000)

const button = document.getElementById('searchBtn')
let inputUser = document.getElementById('searchInp')

const comicsURL='https://superheroapi-m1.herokuapp.com/heroes'

async function getProfiles(){
    const comics = await fetch(comicsURL);
    const comicsjson = await comics.json();
    const marvel =[]
    comicsjson.forEach(function(heroe){
      if(heroe.biography.publisher === 'Marvel Comics'){
        marvel.push(heroe)
      }
    })
   
    return marvel
}

async function searchHero(){
    const heroes = await getProfiles()
    let info = document.querySelector('.textSearch')
    let heroFound = {}
    console.log(inputUser.value)
    heroes.forEach(function(hero){
        if(hero.name.toUpperCase() === inputUser.value.toUpperCase()){
            heroFound = hero
        }
    })

    let imageHero = heroFound.images.sm

    info.innerHTML = `<img src="${imageHero}" /><div class = "words">
            <h3>"${heroFound.name}"</h3>
            <p>${heroFound.name} first appeared in ${heroFound.biography.firstAppearance}</p>
            <p>Strength: ${heroFound.powerstats.strength},
            Speed: ${heroFound.powerstats.speed},
            Durability: ${heroFound.powerstats.durability},
            Power: ${heroFound.powerstats.power}</p></div>`
}

button.addEventListener('click', searchHero)