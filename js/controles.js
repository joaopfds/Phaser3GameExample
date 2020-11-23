class Contorles extends Phaser.Scene
{

    constructor()
    {
        super("Contorles");
    }

    preload()
    { 
        this.load.image("kyboard", "assets/movimentacao.png");
    }

    create()
    {
        this.add.image(0,0,"home").setOrigin(0,0);

        this.add.image(150,120,"kyboard").setOrigin(0,0);

        let btnRturn = this.add.image(450,470,"btnPlay").setOrigin(0,0);
        this.buttonText = this.add.text(505,478, "MENU", {
            fontSize: "30px",
            fill: "#ffff",
          });
        btnRturn.setInteractive();

        
        //this.add.image(320,230,"").setOrigin(0,0);
        

        //Adicionar o clique do botao
        btnRturn.on("pointerdown", () => this.scene.start("HomeGame"));
        
    }
}