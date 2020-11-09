class PlayGame extends Phaser.Scene
{
    constructor()
    {
        super("PlayGame");
        
        
        this.playerPodeAtirar = 1
        this.tiro = 10
        this.inimigoVida = 3
        this.upTiro = 0
        this.inimigos = 10
        this.vidas = 1
        
    }
    
    preload()
    {
        this.load.tilemapTiledJSON('map','assets/untitled.json'); 
    }

    create()
    {   
        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage("tileset (2)", "tiles");
        this.ground = this.map.createStaticLayer("ground", this.tileset, 0, 0);
        this.ground2 = this.map.createStaticLayer("abjectCollider", this.tileset, 0, 0);
        this.ground3 =this.map.createStaticLayer("towers", this.tileset, 0, 0); 
        this.ground4 = this.map.createStaticLayer("towers1", this.tileset, 0, 0);
        this.ground5 = this.map.createStaticLayer("objectcollider2", this.tileset, 0, 0);
        this.inicio = this.physics.add.sprite(600, 300,"inicio").setDepth(10);

        // ----------------------- inimigos e suas movimentaçoes ---------------
        this.ovni1 = this.physics.add.sprite(600, 600, 'ovni').setDepth(1);
        this.ovni2 = this.physics.add.sprite(1000, 890, 'ovni');
        this.ovni3 = this.physics.add.sprite(2000, 700, 'ovni');
        this.ovni4 = this.physics.add.sprite(3600, 500, 'ovni');
        this.ovni5 = this.physics.add.sprite(4000, 590, 'ovni');
        this.ovni6 = this.physics.add.sprite(1500, 1000, 'ovni');
        this.ovni7 = this.physics.add.sprite(2600, 650, 'ovni');
        this.ovni8 = this.physics.add.sprite(2300, 300, 'ovni');
        this.ovni9 = this.physics.add.sprite(850, 690, 'ovni');
        this.ovni10 = this.physics.add.sprite(3000, 550, 'ovni');
        this.ovni11 = this.physics.add.sprite(1800, 300, 'ovniBoss');
        this.ovni12 = this.physics.add.sprite(3200, 550, 'ovniBoss');
        this.bala = this.physics.add.sprite('bullet');
        
        this.et3 = [this.ovni1,this.ovni6,this.ovni8,this.ovni7,this.ovni10,this.ovni2,this.vovni3,this.ovni4,this.ovni5,this.ovni11,this.ovni12];
            this.tweens.add({
                targets: this.et3,
                y: 800,
                duration: 4000,
                ease: "Power2",
                yoyo: true,
                loop: -1
            });
        //---------------------------------------------------------------------------
        
        // --------- player e suas colisoes/ municao -----------------
        this.ground2.setCollisionByProperty({ collider: true });
        this.player = this.physics.add.sprite(300,300, "player");
        this.physics.add.collider(this.player, this.ground2);

        //logo = this.physics.add.sprite(300,300, "kbum");
        //destruiçao = this.physics.add.sprite("kbum");
        this.ammo1 = this.physics.add.sprite(3200,1350, 'ammo');
        this.ammo2 = this.physics.add.sprite(500,800, 'ammo');
        
        // ---------------------------------------------------------


        //this.physics.add.collider(ovni2, this.bala, hitDeath, null, this);
        /*this.et3 = map.createFromObjects("enemy", "enemy", {});
        this.et3.forEach((enemy) => {
            this.add.sprite(enemy.x, enemy.y - 15, 'ovni');
        });*/
        
        //ground5.setDepth(1); 


        // ---------- camera e HUD ----------------------------
        this.camera = this.cameras.main;
        this.camera.startFollow(this.player);
        this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.textTela = this.add.text(20, 490,'HUD', {
            fontFamily: 'Arial, Gadget, sans-serif',
            fontSize: '22px',
            fontStyle: 'bolder',
            backgroundColor: "#black",
            color: 'orange',
            fill: '#FDFFB5',
        }).setScrollFactor(0).setDepth(1);

        if (this.cameras.main.deadzone){
            this. graphics = this.add.graphics().setScrollFactor(0);
            this.graphics.lineStyle(2, 0x00ff00, 1);
            this.graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);      
        }
        //this.physics.add.collider(this.ammo2, this.player, this.ganhaBala);
        //this.physics.add.collider(this.ammo1, this.player, this.ganhaBala);
        // ----------------------------------------------------------------------------------------------------
    }

    update() {
        this.textTela.setText([

            '     HUD' + '\n' +
            'Tiros: ' + this.tiro 
            + '\n' + 'Vida: ' + this.vidas
            + '\n' + 'inimigos: ' + this.inimigos,
        ]);
        var permitiro = true;   
        this.player.body.velocity.set(0);
        this.player.body.acceleration.set(0);
        this.player.setAngle(0);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.ladoTiro = 500;
        if (this.cursors.space.isDown) {
            this.inicio.disableBody(true, true);
        }
      // -------- player movimentacaes ---------------------
        if (this.cursors.left.isDown) {
          //permitiro = false;
          this.ladoTiro = -500;
          this.player.body.setVelocityX(-250);
          this.player.setAngle(-180);
        } else if (this.cursors.right.isDown) {
          //permitiro = false;
          this.ladoTiro = 500;
          this.player.body.setVelocityX(250);
        } else if (this.cursors.up.isDown) {
            permitiro = false;
            this.player.body.setVelocityY(-250);
            this.player.setAngle(-90);
        } else if (this.cursors.down.isDown) {
            permitiro = false;
            this.player.body.setVelocityY(250);
            this.player.setAngle(90);
        } 
        if (this.cursors.left.isDown && this.cursors.up.isDown ) {
            this.player.body.setVelocityX(-250);
            this.player.body.setVelocityY(-250);
            this.player.setAngle(-150);
        } else if (this.cursors.right.isDown && this.cursors.up.isDown) {
            this.player.body.setVelocityX(250);
            this.player.body.setVelocityY(-250);
            this.player.setAngle(-20);
        } else if (this.cursors.down.isDown && this.cursors.left.isDown) {
            this.player.body.setVelocityY(250);
            this.player.body.setVelocityX(-250);
            this.player.setAngle(-230);
        } else if (this.cursors.down.isDown && this.cursors.right.isDown ) {
            this.player.body.setVelocityY(250);
            this.player.body.setVelocityX(250);
            this.player.setAngle(20);
        } else if (this.cursors.down.isDown && this.cursors.up.isDown ) {
            this.player.body.setVelocity(0);
        } else if (this.cursors.left.isDown && this.cursors.right.isDown ) {
            this.player.body.setVelocity(0);
        }
      //------------------------------------------------------------------------------------
      
      // ------------ ---------------------HUD -----------------------------------------------
        
        //-------------------------------------------------------------------------------------  
      
        if(this.cursors.space.isDown && this.playerPodeAtirar == 1 && this.vidas != 0 && permitiro == true){ 
             
            this.bala = this.physics.add.sprite(this.player.x+37, this.player.y+5, 'bullet');
            this.bala.setVelocityX(this.ladoTiro);
            this.playerPodeAtirar = 0; 
            this.ataque = true;      
            this.tiro -=1;
          if (this.tiro < 1){
            this.playerPodeAtirar = 0;
          }   
          //this.physics.add.collider(this.et3, bala, hitDeath, null, this);
      
        
        }
        if(this.cursors.space.isUp && this.tiro > 0){
            this.playerPodeAtirar = 1;
          /*if(ataque == true ) {
            bala = this.physics.add.sprite(ovni1.x, ovni1.y, 'bullet');
            bala.setVelocityX(-500);
            ataque = false*/
        }
        
        // ------ colisao do tiro com os inimigos ------
        this.physics.add.collider(this.bala, this.ovni1, this.hitDeath, null, this);  
        this.physics.add.collider(this.bala, this.ovni2, this.hitDeath, null, this);
        this.physics.add.collider(this.bala, this.ovni3, this.hitDeath, null, this); 
        this.physics.add.collider(this.bala, this.ovni4, this.hitDeath, null, this);
        this.physics.add.collider(this.bala, this.ovni5, this.hitDeath, null, this); 
        this.physics.add.collider(this.bala, this.ovni6, this.hitDeath, null, this);
        this.physics.add.collider(this.bala, this.ovni7, this.hitDeath, null, this); 
        this.physics.add.collider(this.bala, this.ovni8, this.hitDeath, null, this);
        this.physics.add.collider(this.bala, this.ovni9, this.hitDeath, null, this);
        this.physics.add.collider(this.bala, this.ovni10, this.hitDeath, null, this);
        this.physics.add.collider(this.bala, this.ovni11, this.kill, null, this);
        this.physics.add.collider(this.bala, this.ovni12, this.kill, null, this);
        //this.physics.add.collider(this.bala, et3, hitDeath, null);
        
        this.physics.add.collider(this.ammo2, this.player, this.hit, null, this);
        this.physics.add.collider(this.ammo1, this.player, this.hit, null, this);
        this.physics.add.collider(this.bala, this.ground2, this.someBala, null, this);

    }

    hitDeath (bala, ovni){
  
        ovni.disableBody(true, true);
        bala.disableBody(true, true);
        this.inimigos -= 1;
        if(this.inimigos == 0){
          this.player.disableBody(true, true);
          this.scene.restart();
          this.inimigos = 10;
          this.scene.start("HomeGame");
        }
        /*kabum.disableBody(true,true);
        player.anims.play('turn');
        gameOver = true;*/
      
    }
    hit = function(ammo){
        this.tiro += 15;
        ammo.disableBody(true,true);
    }
      
    someBala(ammo){
        ammo.disableBody(true,true);
    }
      
    kill(bala,ovni){
        ovni.body.setVelocity(0);
        ovni.body.acceleration.set(0);
        this.inimigoVida = this.inimigoVida - 1; 
        bala.disableBody(true, true); 
        if (this.inimigoVida == 0){
          ovni.disableBody(true, true);
          this.inimigoVida = 5 
        }
      
    }
}
