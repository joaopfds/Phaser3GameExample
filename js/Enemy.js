import PlayGame from "../scenes/PlayGame";
class Enemy extends Phaser.Physics.Arcade.Sprite{


    constructor(scene,x ,y,player,sprite,attack){

        //pegar nosso monstrinho chamado slime para aplicar no game
        super(scene,x,y,'enemy', 0)
        this.sprite = sprite
        this.scene = scene
        this.walking = 0;
        this.attack = attack;
        this.titulo;
        this.invencible = false;
        this.state = this.walking;
        this.setScale(1.2)
        this.enemyLife = 3;
        this.player = player;
        // habilitando as fisicas do mundo
        this.scene.physics.world.enable(this)

        //adiciona nosso player na cena
        this.scene.add.existing(this)

        //setting time to enemy moves
        this.timeEvent = this.scene.time.addEvent({
            delay: 2500,
            callback: this.move,
            loop: true,
            callbackScope: this
        })
        
    }
    create(){
        this.scene.physics.add.collider(
            this.player,
            this.sprite,
            //funcao para matar o inimigo
            this.hitEnemy,
            null
          );
    }
}

export default Enemy