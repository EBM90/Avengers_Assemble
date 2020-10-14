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
   <p>${nameHero} first appeared in ${firstApp}</p>
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


    

async function startNow(){
  const marvel = await getProfiles()
  
  let hero = marvel[Math.floor(Math.random()*marvel.length)]

  let game = document.querySelector('.play')
    game.innerHTML= `
        <div class="getYourHero">
        <div id="btn"><img src="${hero.images.sm}" /></div>
          <div class="input">
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
        </div>
      </div>
      <h3>${hero.name}</h3> 
    <h5>Total score: ${totalScore}</h5>`
    let strength = document.getElementById('strengthGame').value
    let speed = document.getElementById('speedGame').value
    let durability = document.getElementById('durabilityGame').value
    let power = document.getElementById('powerGame').value
    // if(counter === 0){
    //   let differences = []

    // let diffStrength = Math.abs(strength-hero.powerstats.strength)  
    // let diffSpeed = Math.abs(speed-hero.powerstats.speed) 
    // let diffDura = Math.abs(durability-hero.powerstats.durability)
    // let diffPower = Math.abs(power-hero.powerstats.power)

    // differences.push(diffStrength)
    // differences.push(diffSpeed)
    // differences.push(diffDura)
    // differences.push(diffPower)

    // for(let i = 0; i < differences.length; i++){
    //   if(differences[i]===0){
    //     totalScore += 25
    //   } else if(differences[i]<=10){
    //     totalScore += 15
    //   } else if(differences[i]<=20){
    //     totalScore += 5
    //   }
    // }
    // console.log(hero.powerstats.strength, hero.powerstats.speed, hero.powerstats.durability, hero.powerstats.power)
    // console.log('difference strength: ' + diffStrength)
    // console.log('user strength: ' + strength)
    // console.log(hero.name)
    //   counter++
      
   if(counter === 5) {
    game.innerHTML= `<h3>Congratulations</h3> <h5>Your total score is ${totalScore} </h5>
    <button class="buttonPlay" id="again">Play Again?</button>`
    document.getElementById('again').addEventListener('click', newGame)
  } else {
  
    // strength = document.getElementById('strengthGame').value
    // speed = document.getElementById('speedGame').value
    // durability = document.getElementById('durabilityGame').value
    // power = document.getElementById('powerGame').value
    console.log(strength, speed, durability, power)

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
    console.log(hero.powerstats.strength, hero.powerstats.speed, hero.powerstats.durability, hero.powerstats.power)
    console.log('difference strength: ' + diffStrength)
    console.log('user strength: ' + strength)
    console.log(hero.name)
    counter++
  //   game.innerHTML= `
  //       <div class="getYourHero">
  //       <div id="btn"><img src="${hero.images.sm}" /></div>
  //         <div class="input">
  //           <div class="stats">
  //             <input class="input" id="strengthGame" placeholder="0-100">
  //             <p>STRENGTH<p>
  //           </div>
  //           <div class="stats">
  //             <input class="input" id="speedGame" placeholder="0-100">
  //             <p>SPEED</p>
  //           </div>
  //           <div class="stats">
  //             <input class="input" id="durabilityGame" placeholder="0-100">
  //             <p>DURABILITY<p>
  //           </div>
  //           <div class="stats">
  //             <input class="input" id="powerGame" placeholder="0-100">
  //             <p>POWER<p>
  //           </div>
  //       </div>
  //     </div>
  //     <h3>${hero.name}</h3> 
  //   <h5>Total score: ${totalScore}</h5>`
  // 
}
  
  
}
let heroes = []

let heroesGameSt = []
let heroesGameSp = []
let heroesGameDu = []
let heroesGamePw = []

let inputGameSt = []
let inputGameSp = []
let inputGameDu = []
let inputGamePw = []

let diffSt = []
let diffSp = []
let diffDu = []
let diffPw = []


let counter = 0

let game = document.querySelector('.play')
async function start() {
  let totalScore = 0
  const marvel = await getProfiles()
  
  let hero1 = marvel[Math.floor(Math.random()*marvel.length)]
  let hero2 = marvel[Math.floor(Math.random()*marvel.length)]
  let hero3 = marvel[Math.floor(Math.random()*marvel.length)]
  let hero4 = marvel[Math.floor(Math.random()*marvel.length)]
  let hero5 = marvel[Math.floor(Math.random()*marvel.length)]

  

  heroes.push(hero1)
  heroes.push(hero2)
  heroes.push(hero3)
  heroes.push(hero4)
  heroes.push(hero5)

  heroes.forEach(function(heroe){
    heroesGameSt.push(heroe.powerstats.strength)
    heroesGameSp.push(heroe.powerstats.speed)
    heroesGameDu.push(heroe.powerstats.durability)
    heroesGamePw.push(heroe.powerstats.power)
  })

  let currentHero = heroes[counter] 

    game.innerHTML= `
        <div class="getYourHero">
        <div id="btn"><img src="${currentHero.images.sm}" /></div>
          <div class="input">
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
        </div>
      </div>
      <h3>${currentHero.name}</h3> 
    <h5>Total score: ${totalScore}</h5>`

    counter++
}

function getInput(){
    let totalScore = 0

    let strength = document.getElementById('strengthGame').value
    let speed = document.getElementById('speedGame').value
    let durability = document.getElementById('durabilityGame').value
    let power = document.getElementById('powerGame').value

    inputGameSt.push(strength)
    inputGameSp.push(speed)
    inputGameDu.push(durability)
    inputGamePw.push(power)

    for(let i = 0; i < inputGameSt.length; i++){
      diffSt[i] = Math.abs(inputGameSt[i]-heroesGameSt[i])
    }

    for(let i = 0; i < inputGameSp.length; i++){
      diffSp[i] = Math.abs(inputGameSp[i]-heroesGameSp[i])
    }

    for(let i = 0; i < inputGameDu.length; i++){
      diffDu[i]=Math.abs(inputGameDu[i]-heroesGameDu[i])
    }

    for(let i = 0; i < inputGamePw.length; i++){
      diffPw[i]=Math.abs(inputGamePw[i]-heroesGamePw[i])
    }


    for(let i = 0; i<diffSt.length; i++){
      if(diffSt[i] ===0){
        totalScore += 50
      } else if(diffSt[i] <10){
        totalScore += 25
      } else if (diffSt[i] <20){
        totalScore += 10
      }
    }

    for(let i = 0; i<diffSp.length; i++){
      if(diffSp[i] ===0){
        totalScore += 50
      } else if(diffSp[i] <10){
        totalScore += 25
      } else if (diffSp[i] <20){
        totalScore += 10
      }
    }

    for(let i = 0; i<diffDu.length; i++){
      if(diffDu[i] ===0){
        totalScore += 50
      } else if(diffDu[i] <10){
        totalScore += 25
      } else if (diffDu[i] <20){
        totalScore += 10
      }
    }

    for(let i = 0; i<diffPw.length; i++){
      if(diffPw[i] ===0){
        totalScore += 50
      } else if(diffPw[i] <10){
        totalScore += 25
      } else if (diffPw[i] <20){
        totalScore += 10
      }
    }

    if(counter === 5) {
      game.innerHTML= `<h3>Congratulations</h3> <h5>Your total score is ${totalScore} </h5>
      <button class="buttonPlay" id="again">Play Again?</button>`
      document.getElementById('again').addEventListener('click', start)
    } else {
    let currentHero = heroes[counter] 
  let game = document.querySelector('.play')
    game.innerHTML= `
        <div class="getYourHero">
        <div id="btn"><img src="${currentHero.images.sm}" /></div>
          <div class="input">
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
        </div>
      </div>
      <h3>${currentHero.name}</h3> 
    <h5>Total score: ${totalScore}</h5>`

    counter++
    }
}


document.getElementById('button').addEventListener('click', yourHero)
document.getElementById('buttonRandom').addEventListener('click', yourRandom)
document.getElementById('buttonStart').addEventListener('click', start)
document.getElementById('next').addEventListener('click', getInput)




