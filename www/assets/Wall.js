class Walls {

    constructor() {
        this.walldiv = document.getElementById('wall').cloneNode(true);
        this.walldiv.style.display = 'block';
        this.walls = [];
    }


    putNewWall(x, y) {
        let newWall = this.walldiv.cloneNode(true);
        newWall.style.transform = "translate(" + x + "px , " + y + "px)"
        this.walls.push({ x: x, y: y })
        document.body.appendChild(newWall);
    }
}