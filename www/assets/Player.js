const speed = 1;
const borderSize = 2500;


class Player {

    constructor({ x, y }, div) {
        this.visionSize = 100;
        this.size = borderSize + (this.visionSize / 2)
        this.x = x - this.size;
        this.y = y - this.size;
        this.div = div;
        this.ymoov = 0;
        this.xmoov = 0;
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

    changeVisionSize(size) {
        console.log(size)
        const lastSize = this.visionSize;

        const diff = (size - lastSize) / 2
        this.x -= diff
        this.y -= diff

        this.visionSize = size;
        this.div.style.height = this.visionSize + "px"
        this.div.style.width = this.visionSize + "px"
    }

    moov() {
        this.size = borderSize + (this.visionSize / 2)
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