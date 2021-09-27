const readline = require('readline');
const logUpdate = require('log-update');
const { SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG } = require('constants');
const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout
})

readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY){
        process.stdin.setRawMode(true);
    }

process.stdin.on('keypress',(character, key) => {
    if (key.name === 'a') {
        eat()
        return;
    }

    if (key.name === 'z') {
        sleep()
        return;
    }

    if (key.name === 'e') {
        eatAndSleep()
        return;
    }
})

rl.on('close', () => {
    process.exit(0)
})

const bear = [
'ʕ•ᴥ•ʔ',
'ʕ·ᴥ·ʔ',
'ʕºᴥºʔ'
];

const bearDead = '(⌐▀͡ ̯ʖ▀)︻̷┻̿═━一- ʕºᴥºʔ DEAD'

const hungry = '🍔ԅ( ͒ ۝ ͒ )I need eat, PRESS A'

const fatigue = '(╥﹏╥ )I need sleep, PRESS Z'

const all = '(┳__┳) I need eat and sleep, plz let me die , PRESS E'

const state = {
    life: 100,
    time: 0, // temps en secondes
    faim: false,
    fatigue:false,
    all:false,
    heal:15
}

function recupererVie() {
    let life = state.life
    let heart = '❤❤❤❤' 
        if(life >= 75){
            return heart 
        }else if(life >= 50) {
            return heart ='❤❤❤♡' 
        }else if(life >= 25) {
            return heart = '❤❤♡♡'
        }else if(life > 0){
            return heart = '❤♡♡♡'
        }
}

function eat() {
    if(state.faim === false) {
        return
    }
    if(state.faim === true && state.fatigue === true) {
        return
    }
    state.life += state.heal
    state.faim = false
}

function sleep() {
    if(state.fatigue === false || state.all === true) {
        return
    }
    if(state.faim === true && state.fatigue === true) {
        return
    }
    state.life += state.heal
    state.fatigue = false
}

function eatAndSleep() {
    if(state.fatigue === false && state.faim === false) {
        return
    }
    state.life += state.heal
    state.all = false
    state.fatigue = false
    state.faim = false
}

let position = 0

function getOurs() {
    if (state.faim === true && state.life > 0 && state.fatigue === false ){
        return generateSpace() + hungry
    }
    if(state.faim === false && state.life > 0 && state.fatigue === true) {
        return generateSpace() + fatigue
    }
    if(state.faim === true && state.life > 0 && state.fatigue === true) {
        
        return generateSpace() + all
    }
    if(state.life > 0){
        return generateSpace() + bear[Math.floor(Math.random() * bear.length)]
    }
    return bearDead
    
    
}

function between(min,max) {
    return Math.floor(
        Math.random()*(max-min) + min
    )
}

function generateSpace() {
    return new Array(between(0,50)).fill(' ').join('')
}
  
setInterval(function() {
    state.time+=1
    if (state.time %3 === 0) {
        state.life--
        if(between(0,5) === 4) {
            state.faim = true
            state.life -= 10
            if(between(0,5) === 4) {
                state.all = true
            }
        }else if(between(0,5) === 2) {
            state.fatigue = true
        }
    }
}, 500)

setInterval(function() {
    const espace = [
        recupererVie(),
        '',
        getOurs()
        
    ]
    logUpdate(espace.join('\n'));
}, 1000)

