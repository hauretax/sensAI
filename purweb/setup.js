

function setup(map, wall) {
    playerP = { x: 0, y: 0 };
    map.forEach((element, index) => {
        for (let i = 0; i < element.length; i++) {
            if (element[i] == 'X') {
                //wall is declare in index.js
                wall.putNewWall(i * 25, index * 25);
            }
            if (element[i] == 'P') {
                playerP.x = i * 25
                playerP.y = index * 25
            }
        }
    })
    if (playerP.x == 0) {
        alert('no player on map ??')
    }
    return playerP
}