const speed = 1;
const borderSize = 2500;
let lastScream = { x: 0, y: 0 }

class Player {

    constructor({ x, y }, div, screamer) {
        this.visionSize = 100;
        this.size = borderSize + (this.visionSize / 2)
        this.x = x - this.size;
        this.y = y - this.size;
        this.div = div;
        this.ymoov = 0;
        this.xmoov = 0;
        this.screamer = screamer;
        this.audio = new Audio('assets/grognement-1.mp3');
        this.audio.pause()
    }

    isLegal(newX, newY) {
        let xp = 0
        let yp = 0
        if (newX > this.x)
            xp = Math.floor((newX + this.size + 5) / 25)
        else
            xp = Math.floor((newX + this.size - 5) / 25)
        if (newY > this.y)
            yp = Math.floor((newY + this.size + 5) / 25)
        else
            yp = Math.floor((newY + this.size - 5) / 25)

        let tmpChar = map[yp][xp];
        if (tmpChar === 'O' || tmpChar === 'P') {
            return 1
        }
        if (tmpChar == 'A') {
            if (lastScream.x !== xp && lastScream.y !== yp) {
                io.event("jump_scare");
                lastScream.x = xp;
                lastScream.y = yp;
            }
            return 2
        }
        if (tmpChar === 'X') {
            return 0
        }
        if (tmpChar === 'S') {
            on = false
            if (mapsStr == 'chill') {
                io.event("end_low");
                alert('appuier sur entree quand vous vous senter pret');
            }
            else {

                io.event("end_high");
                alert("merci d'avoir participer")
            }
            window.location.href = "http://localhost:8000/smile/?maps=map"
            return 0
        }
    }

    changeVisionSize(size) {
        const lastSize = this.visionSize;

        const diff = (size - lastSize) / 2
        this.x -= diff
        this.y -= diff

        this.visionSize = size;
        this.div.style.height = this.visionSize + "px"
        this.div.style.width = this.visionSize + "px"
    }

    moov() {
        let result_move = 0;
        this.size = borderSize + (this.visionSize / 2)
        if (this.ymoov) {
            result_move = this.isLegal(this.x, speed * this.ymoov + this.y)
            if (result_move)
                this.y += speed * this.ymoov;
        }
        if (this.xmoov) {
            result_move = this.isLegal(speed * this.xmoov + this.x, this.y)
            if (result_move)
                this.x += speed * this.xmoov;
        }
        if (result_move === 2) {


            this.screamer.style.visibility = "visible"
            this.audio.play()
            setTimeout(function () {
                this.screamer.style.visibility = "hidden"
            }, 300)
        }

    }

    print() {

        this.div.style.transform = "translate(" + this.x + "px , " + this.y + "px)"

    }


}
