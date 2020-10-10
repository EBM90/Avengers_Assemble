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

async function yourHero(strength, speed, durability, power, random = false){
    const heroes = await getProfiles()
    let randomHero=[] 

    if(!random){
        strength = document.getElementById('strength').value
        speed = document.getElementById('speed').value
        durability = document.getElementById('durability').value
        power = document.getElementById('power').value
    }
    

    function getRandom(heroe, number){
      if(Math.abs(heroe.powerstats.strength - strength)<number && Math.abs(heroe.powerstats.speed - speed) <number && Math.abs(heroe.powerstats.durability - durability) <number && Math.abs(heroe.powerstats.power - power)<number){
        randomHero.push(heroe)
      }
    }
    
    heroes.forEach(function(heroe){
      getRandom(heroe,10)
    })
    
    if(randomHero.length === 0){
        heroes.forEach(function(heroe){
        getRandom(heroe,20)
      })
    }
      if(randomHero.length === 0){
        heroes.forEach(function(heroe){
        getRandom(heroe,38)
    })
  }
  
   let finalHero = randomHero[Math.floor(Math.random()*randomHero.length)]
   let imageHero = finalHero.images.sm
   let firstApp = finalHero.biography.firstAppearance
   let nameHero = finalHero.name
   let strengthHero = finalHero.powerstats.strength
   let speedHero = finalHero.powerstats.speed
   let duraHero = finalHero.powerstats.durability
   let powerHero = finalHero.powerstats.power

   let button = document.getElementById('btn')
   button.innerHTML = ``
   let text = document.getElementById('text')
   let image =`<img src="${imageHero}" />`
   let stats =`<p>"${nameHero}" first appeared in ${firstApp}</p>
   <p>Strength: ${strengthHero},
   Speed: ${speedHero},
   Durability: ${duraHero},
   Power: ${powerHero}</p>`
   
   button.innerHTML = image
   text.innerHTML = stats

}

async function yourRandom() {
    let strength = Math.floor(Math.random()*100 + 1)
    let speed = Math.floor(Math.random()*100 + 1)
    let durability = Math.floor(Math.random()*100 + 1)
    let power = Math.floor(Math.random()*100 + 1)

    yourHero(strength, speed, durability, power, true)
}


document.getElementById('button').addEventListener('click', yourHero)
document.getElementById('buttonRandom').addEventListener('click', yourRandom)

