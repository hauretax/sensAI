const speed = 1;
const size = 2550;


class Player {

    constructor({ x, y }, div) {
        this.x = x - size;
        this.y = y - size;
        this.div = div;
        this.ymoov = 0;
        this.xmoov = 0;
    }

    isLegal(newX, newY) {
        let xp = 0
        let yp = 0
        if (newX > this.x)
            xp = Math.floor((newX + size + 5) / 25)
        else
            xp = Math.floor((newX + size - 5) / 25)
        if (newY > this.y)
            yp = Math.floor((newY + size + 5) / 25)
        else
            yp = Math.floor((newY + size - 5) / 25)

        console.log('old', (this.x + size) / 25, 'next:', xp, (newX + size) / 25)
        let tmpChar = map[yp][xp];
        if (tmpChar === 'O' || tmpChar == 'P') {
            return true
        }
        if (tmpChar == 'X') {
            return false
        }
        if (tmpChar == 'S') {
            alert('BRAVO vous avez gagner et tout et tout');
            return false
        }
    }

    moov() {
        if (this.ymoov) {
            if (this.isLegal(this.x, speed * this.ymoov + this.y))
                this.y += speed * this.ymoov;
        }
        if (this.xmoov) {
            if (this.isLegal(speed * this.xmoov + this.x, this.y))
                this.x += speed * this.xmoov;
        }
    }

    print() {
        this.div.style.transform = "translate(" + this.x + "px , " + this.y + "px)"
    }


}