class HomeGame extends Phaser.Scene
{

    constructor()
    {
        super("HomeGame");
    }

    preload()
    {  
        this.load.image("btnPlay", "assets/blue_button02.png");
        this.load.image("fundo", "assets/fundo.png");
        this.load.image("dudecapa", "assets/dudecapa.png");

        //PlayGame
        this.load.tilemapTiledJSON("map","assets/untitled.json"); 
        
        //EndGame
        this.load.image("btnVoltar", "assets/voltar.png");
        this.load.image("tiles", 'assets/tileset.png' );
        this.load.image("home", 'assets/Home.png' );
        this.load.spritesheet("ammo", "assets/ammoBox.png",{
            frameWidth: 1000,
            frameHeight: 1000,
        });
        this.load.image("bullet", "assets/shmup-bullet.png");
        this.load.image("fim", "assets/gv.png");
        this.load.spritesheet("inicio", "assets/inicio.png",{
            frameWidth: 1000,
            frameHeight: 1000,
        });
        this.load.spritesheet("player", 'assets/airfoce1.png', {
            frameWidth: 40,
            frameHeight: 60,
        });
        this.load.image("kbum", 'assets/kbum.png');
        this.load.spritesheet('ovni', 'assets/ovni2.png', {
            frameWidth: 120,
            frameHeight: 90,
        });
        this.load.spritesheet('ovniBoss', 'assets/blue-ufo.png', {
            frameWidth: 600,
            frameHeight: 100,
        });
    }

    create()
    {
        this.add.image(0,0,"home").setOrigin(0,0);
        let btnPlay = this.add.image(450,270,"btnPlay").setOrigin(0,0);
        btnPlay.setInteractive();

        
        //this.add.image(320,230,"").setOrigin(0,0);
        

        //Adicionar o clique do botao
        btnPlay.on("pointerdown", () => this.scene.start("PlayGame"));

        let btnControls = this.add.image(450,470,"btnPlay").setOrigin(0,0);
        btnControls.setInteractive();

        
        //this.add.image(320,230,"").setOrigin(0,0);
        

        //Adicionar o clique do botao
        btnControls.on("pointerdown", () => this.scene.start("Contorles"));
    }
}