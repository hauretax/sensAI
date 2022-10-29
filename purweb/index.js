document.body.scrollTop = 0;
document.body.scrollLeft = 0;
document.body.style.overflow = 'hidden';


wall = new Walls()
player = new Player(setup(map, wall), document.getElementById('player'))



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

    //  if (!fini)
    window.requestAnimationFrame(iteration);

}

window.requestAnimationFrame(iteration);