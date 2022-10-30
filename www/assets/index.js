
var audio1 = new Audio('assets/as.mp3');
var audio2 = new Audio('assets/song1.mp3');
let temps = 100;
let timerElement;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let mapsStr = urlParams.get('maps')
let map = maps[mapsStr];

if (!map) {
    map = maps['chill'];
    mapsStr = 'chill'
}

function diminuerTemps() {
    let minutes = parseInt(temps / 60, 10)
    let secondes = parseInt(temps % 60, 10)

    minutes = minutes < 10 ? "0" + minutes : minutes
    secondes = secondes < 10 ? "0" + secondes : secondes

    timerElement.innerText = minutes + ":" + secondes
    temps = temps <= 0 ? 0 : temps - 1
}


document.getElementById('button').onclick = function () {
    this.style.display = "none";
    if (mapsStr == 'chill') {
        audio1.play();
        io.event("start_low");
    }
    else {
        audio2.play();
        io.event("start_high");

    }
    timerElement = document.getElementById("timer")
    timerElement.innerText = temps

    setInterval(diminuerTemps, 1000)
}

let io = new IO();

io.on("connect", () => {
    console.log("io connected");
    io.subscribe("phasic");
})

io.on("phasic", (data) => {


    let row = data[Object.keys(data)[Object.keys(data).length - 1]]; // Last row
    let column = Object.keys(row)[0]; // First column
    let value = row[column];
    console.log(value)

    const maxvision = 200;

    player.changeVisionSize(maxvision - value * 70);
})

const wall = new Walls()
const player = new Player(setup(map, wall), document.getElementById('player'), document.getElementById('screamer'))
if (mapsStr == 'chill')
    player.div.style.borderColor = "rgba(10, 10, 10, 0)"
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
