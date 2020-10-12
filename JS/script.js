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
   let stats =`<h3>"${nameHero}"</h3>
   <p><b>${nameHero}</b> first appeared in ${firstApp}</p>
   <p><b>Strength</b>: ${strengthHero},
   <b>Speed</b>: ${speedHero},
   <b>Durability</b>: ${duraHero},
   <b>Power</b>: ${powerHero}</p>`
   
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

let counter = 0
let totalScore = 0

async function start(){
  const marvel = await getProfiles()

  let hero = marvel[Math.floor(Math.random()*marvel.length)]
  let game = document.querySelector('.play')
  if(counter === 0){
    game.innerHTML= `<h3>${hero.name}</h3> <h5>Total score: ${totalScore}</h5>
      
      <div class="input">
      <img src="${hero.images.sm}" />
            <div class="stats">
              <input class="input" id="strengthGame" placeholder="0-100">
              <p>STRENGTH<p>
            </div>
            <div class="stats">
              <input class="input" id="speedGame" placeholder="0-100">
              <p>SPEED</p>
            </div>
            <div class="stats">
              <input class="input" id="durabilityGame" placeholder="0-100">
              <p>DURABILITY<p>
            </div>
            <div class="stats">
              <input class="input" id="powerGame" placeholder="0-100">
              <p>POWER<p>
            </div>
          </div>`
      counter++
      
  } else if(counter === 5) {
    game.innerHTML= `<h3>Congratulations</h3> <h5>Your total score is ${totalScore} </h5>
    <button id="again" style="width: 150px">Play Again?</button>`
    document.getElementById('again').addEventListener('click', newGame)
  } else {
    let strength = document.getElementById('strengthGame').value
    let speed = document.getElementById('speedGame').value
    let durability = document.getElementById('durabilityGame').value
    let power = document.getElementById('powerGame').value

    hero = marvel[Math.floor(Math.random()*marvel.length)]

    let differences = []

    let diffStrength = Math.abs(strength-hero.powerstats.strength)  
    let diffSpeed = Math.abs(speed-hero.powerstats.speed) 
    let diffDura = Math.abs(durability-hero.powerstats.durability)
    let diffPower = Math.abs(power-hero.powerstats.power)

    differences.push(diffStrength)
    differences.push(diffSpeed)
    differences.push(diffDura)
    differences.push(diffPower)

    for(let i = 0; i < differences.length; i++){
      if(differences[i]===0){
        totalScore += 25
      } else if(differences[i]<=10){
        totalScore += 15
      } else if(differences[i]<=20){
        totalScore += 5
      }
    }
    counter++
    game.innerHTML= `<h3>${hero.name}</h3> <h5>Total score: ${totalScore}</h5>
      
      <div class="input">
      <img src="${hero.images.sm}" />
            <div class="stats">
              <input class="input" id="strengthGame" placeholder="0-100">
              <p>STRENGTH<p>
            </div>
            <div class="stats">
              <input class="input" id="speedGame" placeholder="0-100">
              <p>SPEED</p>
            </div>
            <div class="stats">
              <input class="input" id="durabilityGame" placeholder="0-100">
              <p>DURABILITY<p>
            </div>
            <div class="stats">
              <input class="input" id="powerGame" placeholder="0-100">
              <p>POWER<p>
            </div>
          </div>`
  }
  
  console.log(totalScore)
  
}

function newGame() {
  counter = 0
  totalScore = 0
  start()
}


document.getElementById('button').addEventListener('click', yourHero)
document.getElementById('buttonRandom').addEventListener('click', yourRandom)
document.getElementById('buttonStart').addEventListener('click', start)



