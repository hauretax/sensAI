
var audio = new Audio('assets/song1.mp3');
let temps = 100;
let timerElement;


function diminuerTemps() {
    let minutes = parseInt(temps / 60, 10)
    let secondes = parseInt(temps % 60, 10)

    minutes = minutes < 10 ? "0" + minutes : minutes
    secondes = secondes < 10 ? "0" + secondes : secondes

    timerElement.innerText = minutes + ":" + secondes
    temps = temps <= 0 ? 0 : temps - 1
}


document.getElementById('button').onclick = function() {
    this.style.display = "none";
    audio.play();
    timerElement = document.getElementById("timer")
    timerElement.innerText = temps
  
    setInterval(diminuerTemps, 1000)
  }

let io = new IO();

io.on("connect", () => {
    console.log("io connected");
    io.subscribe("smoothed");
})

let min = 10000;
let max = 0;
//setup vision based on distance vision wanted in px (Y) and data receivd (X)
const maxX = 17
const maxY = 120
const minX = 9
const minY = 20
let indice = maxX - minX;
console.log('indice:', indice)
let mult = 100 / indice;
console.log('mult:', mult)
io.on("smoothed", (data) => {


    let row = data[Object.keys(data)[Object.keys(data).length - 1]]; // Last row
    let column = Object.keys(row)[0]; // First column
    let value = row[column];

    let newvalue = (value - minX) * mult;


    if (newvalue < min) {
        console.log('min:', newvalue, value)
        min = newvalue
    }
    if (newvalue > max) {
        console.log('max:', newvalue, value)
        max = newvalue
    }
    player.changeVisionSize(newvalue);
})

const wall = new Walls()
const player = new Player(setup(map, wall), document.getElementById('player'), document.getElementById('screamer'))

function update() {
    player.moov();
}

function draw() {
    player.print()
}

const element = document.getElementById('player');
let debut, tempsPrecedent;
let fini = false;

function iteration(chrono) {
    if (debut === undefined) {
        debut = chrono;
    }
    const ecoule = chrono - debut;
    if (tempsPrecedent !== chrono) {
        // Math.min() est utilisée ici afin de s'assurer
        // que l'élément s'arrête exactement à 200px
        const compteur = Math.min(0.1 * ecoule, 200);
        draw();
        update();
        if (compteur === 200) fini = true;
    }
    if (on)
        window.requestAnimationFrame(iteration);

}

window.requestAnimationFrame(iteration);
