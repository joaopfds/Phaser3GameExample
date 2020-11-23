var game;

window.onload = function()
{
    let gameConfig = 
    {
        scale:{
            width:1100,
            height:600,
            autoCenter:Phaser.Scale.CENTER_BOTH
        },
        physics:{
            default:'arcade',
            arcade: {
                debug: false,
                gravity: {x: 0, y: 0},
            }
        },
        backgroundColor: '#ffff',
        scene:[HomeGame, PlayGame, Contorles, EndGame ]
    };
    game = new Phaser.Game(gameConfig);

    window.focus();
}
