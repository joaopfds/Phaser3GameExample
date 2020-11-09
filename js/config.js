var game;

window.onload = function()
{
    let gameConfig = 
    {
        scale:{
            width:1160,
            height:630,
            autoCenter:Phaser.Scale.CENTER_BOTH
        },
        physics:{
            default:'arcade',
            arcade: {
                gravity: {x: 0, y: 0},
            }
        },
        backgroundColor: '#9FFB98',
        scene:[HomeGame, PlayGame, Contorles ]
    };
    game = new Phaser.Game(gameConfig);

    window.focus();
}
