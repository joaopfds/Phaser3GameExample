class EndGame extends Phaser.Scene
{

    constructor()
    {
        super("EndGame");
        //this.mensagem;
    }

  

    create()
    {
        
       // game.scene.keys["PlayGame"].fase=1;
        
        
        
        this.add.image(0,0,"home").setOrigin(0,0);
        /*if(this.mensagem === "Você Venceu!!!")
        {
           
            this.add.text(150,50,"Você venceu com o tempo de: " + game.scene.keys["PlayGame"].tempo, {fontSize:'22px', fill:'purple'});
            if(localStorage.getItem("recorde") < game.scene.keys["PlayGame"].tempo)
            {
                localStorage.setItem("recorde", game.scene.keys["PlayGame"].tempo);
                this.add.text(150,80,"Parabéns, você tem o novo recorde do jogo", {fontSize:'22px', fill:'purple'});
            }
        }
        else
        {
            this.add.text(150,50,this.mensagem, {fontSize:'22px', fill:'purple'});
        }*/
        if(game.scene.keys["PlayGame"].inimigos != 0){
            this.add.text(360,300,"Você falhou, tente novamente", {fontSize:'22px', fill:'purple', font: 'bold 25px Arial',backgroundColor: "gray",});
        }
        else{
            this.add.text(360,300,"Seu tempo foi de: " + (120 - game.scene.keys["PlayGame"].tempo) + ' Segundos !', {fontSize:'22px', fill:'purple', font: 'bold 25px Arial',backgroundColor: "gray",});
        }
        
        game.scene.keys["PlayGame"].tempo = 120;
        game.scene.keys["PlayGame"].timer = 118
        let btnPlay = this.add.image(435,400,"btnPlay").setOrigin(0,0);
        this.buttonText = this.add.text(440,413, "JOGAR NOVAMENTE", {
            fontSize: "20px",
            fill: "#ffff",
          });
        btnPlay.setInteractive();

        let btnHome = this.add.image(435,500,"btnPlay").setOrigin(0,0);
        this.buttonText = this.add.text(500,508, "MENU", {
            fontSize: "30px",
            fill: "#ffff",
          });
        btnHome.setInteractive();
        
        //game.scene.keys["PlayGame"].restat();
        //game.scene.keys["PlayGame"].tempo=90;

        //Adicionar o clique do botao
        btnPlay.on("pointerdown", () => this.scene.start("PlayGame"));
        btnHome.on("pointerdown", () => this.scene.start("HomeGame"));
    }
}