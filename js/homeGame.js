class HomeGame extends Phaser.Scene
{

    constructor()
    {
        super("HomeGame");
    }

    preload()
    {  
        this.load.image("btnPlay", "assets/blue_button02.png");
        this.load.tilemapTiledJSON("map","assets/untitled.json"); 
        this.load.image("tiles", 'assets/tileset.png' );

        this.load.image("home", 'assets/main.png' );
        this.load.spritesheet("ammo", "assets/ammoBox.png",{
            frameWidth: 100,
            frameHeight: 100,
        });
        this.load.spritesheet("bullet", "assets/shmup-bullet.png", {
            frameWidth: 40,
            frameHeight: 40,
        });
        this.load.spritesheet("life", 'assets/vida.png', {
            frameWidth: 80,
            frameHeight: 80,
        });
        this.load.spritesheet("player", 'assets/airfoce1.png', {
            frameWidth: 50,
            frameHeight: 60,
        });
        this.load.image("kbum", 'assets/kbum.png');
        this.load.spritesheet('ovni', 'assets/ovni2.png', {
            frameWidth: 120,
            frameHeight: 90,
        });
        this.load.spritesheet('ovniBoss', 'assets/blue-ufo.png', {
            frameWidth: 200,
            frameHeight: 70,
        });
        this.load.audio("tema", "assets/audio/theme.mp3");
        this.load.audio("disparo", "assets/audio/shoot.mp3");
        this.load.audio("life", "assets/audio/life.mp3");
        this.load.audio("recarga", "assets/audio/municao.mp3");
        this.load.audio("destruct", "assets/audio/destruicao.m4a");

        
    }
    create()
    {   
        this.add.image(0,0,"home").setOrigin(0,0);
        let btnPlay = this.add.image(450,370,"btnPlay").setOrigin(0,0);
        this.buttonText = this.add.text(500,378, "JOGAR", {
            fontSize: "30px",
            fill: "#ffff",
        });
        btnPlay.setInteractive();
        //Adicionar o clique do botao
        btnPlay.on("pointerdown", () => this.scene.start("PlayGame"));

        
        /*let btnAbout = this.add.image(450,370,"btnPlay").setOrigin(0,0);
        this.buttonText = this.add.text(500,378, "JOGAR", {
            fontSize: "30px",
            fill: "#ffff",
        });
        btnAbout.setInteractive();*/

        
        //this.add.image(320,230,"").setOrigin(0,0);

        let btnControls = this.add.image(450,470,"btnPlay").setOrigin(0,0);
        this.buttonText = this.add.text(465,478, "CONTROLES", {
            fontSize: "30px",
            fill: "#ffff",
          });
        btnControls.setInteractive();

        
        //this.add.image(320,230,"").setOrigin(0,0);
        

        //Adicionar o clique do botao
        btnControls.on("pointerdown", () => this.scene.start("Contorles"));
    }
}