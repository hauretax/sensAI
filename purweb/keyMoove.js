document.onkeydown = function (e) {
    
    // use e.keyCode
    if (e.code === 'ArrowDown')
        player.ymoov = 1;
    else if (e.code === 'ArrowUp')
        player.ymoov = -1;

    if (e.code === 'ArrowLeft')
        player.xmoov = -1;
    else if (e.code === 'ArrowRight')
        player.xmoov = 1;
};

document.onkeyup = function (e) {
    // use e.keyCode
    if (e.code === 'ArrowDown' || e.code === 'ArrowUp')
        player.ymoov = 0;

    if (e.code === 'ArrowLeft' || e.code === 'ArrowRight')
        player.xmoov = 0;
};