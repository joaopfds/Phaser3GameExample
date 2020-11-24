class PlayGame extends Phaser.Scene
{
    constructor()
    {
        super("PlayGame");
        
        this.txtTempo
        this.contador
        this.life
        this.tema;
    }
    
    preload()
    {  
        this.load.tilemapTiledJSON('map','assets/untitled.json'); 
       
    }

    create()
    {   this.playerPodeAtirar = 1
        this.tiro = 10
        this.bossVida1 = 5
        this.bossVida2 = 5
        this.bossVida3 = 5
        this.vidas = 1
        this.tempo= 120
        this.timer = 118
        this.o1 = 0;this.o4 = 1;this.o5 = 1;
        this.o2 = 0;this.o6 = 1;this.o7 = 1;
        this.o3 = 0; this.o8 = 1;this.o9 = 1;
        this.o10 = 1;this.o11 = 0;this.o12 = 1;
        this.o13 = 1;
        this.inimigos = 13;
        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage("tileset (2)", "tiles");
        this.ground = this.map.createStaticLayer("ground", this.tileset, 0, 0);
        this.ground2 = this.map.createStaticLayer("abjectCollider", this.tileset, 0, 0);
        this.ground3 =this.map.createStaticLayer("towers", this.tileset, 0, 0); 
        this.ground4 = this.map.createStaticLayer("towers1", this.tileset, 0, 0);
        this.ground5 = this.map.createStaticLayer("objectcollider2", this.tileset, 0, 0);
        // ----------------------- inimigos e suas movimentaçoes ---------------
        this.ovni1 = this.physics.add.sprite(600, 600, 'ovni').setDepth(1);
        this.ovni2 = this.physics.add.sprite(850, 690, 'ovni');
        this.ovni3 = this.physics.add.sprite(1000, 890, 'ovni');
        this.ovni4 = this.physics.add.sprite(1500, 1000, 'ovni');
        this.ovni5 = this.physics.add.sprite(2200, 700, 'ovni');
        this.ovni6 = this.physics.add.sprite(2800, 300, 'ovni');
        this.ovni7 = this.physics.add.sprite(3000, 650, 'ovni');
        this.ovni8 = this.physics.add.sprite(3600, 550, 'ovni');
        this.ovni9 = this.physics.add.sprite(4000, 500, 'ovni');
        this.ovni10 = this.physics.add.sprite(4300, 590, 'ovni');
        this.ovni11 = this.physics.add.sprite(1900, 300, 'ovniBoss');
        this.ovni12 = this.physics.add.sprite(3200, 550, 'ovniBoss');
        this.ovni13 = this.physics.add.sprite(4800, 550, 'ovniBoss');
        this.bala = this.physics.add.sprite('bullet');
        this.balaOV = this.physics.add.sprite('bullet');
        this.life = this.physics.add.sprite(2700, 400, 'life');
        this.et3 = [this.ovni1,this.ovni6,this.ovni8,this.ovni7,this.ovni10,this.ovni2,this.vovni3,this.ovni4,this.ovni5,this.ovni11,this.ovni12];
            this.tweens.add({
                targets: this.et3,
                y: 800,
                duration: 3000,
                ease: "Power2",
                yoyo: true,
                loop: -1
            });
        // --------- player e suas colisoes/ municao -----------------
        this.ground2.setCollisionByProperty({ collider: true });
        this.player = this.physics.add.sprite(300,300, "player");
        this.physics.add.collider(this.player, this.ground2);

        this.ammo1 = this.physics.add.sprite(3200,1250, 'ammo');
        this.ammo2 = this.physics.add.sprite(500,1000, 'ammo');
        
        // ---------------------------------------------------------

        //this.physics.add.collider(ovni2, this.bala, hitDeath, null, this);
        /*this.et3 = map.createFromObjects("enemy", "enemy", {});
        this.et3.forEach((enemy) => {
            this.add.sprite(enemy.x, enemy.y - 15, 'ovni');
        });*/

        // ---------- camera e HUD ----------------------------
        this.camera = this.cameras.main;
        this.camera.startFollow(this.player);
        this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.textTela = this.add.text(20, 460,'HUD', {
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
        
        // ----------------------------------------------------------------------------------------------------
        this.contador = this.time.addEvent({delay:1000,repeat: this.tempo});

        this.tema = this.sound.add("tema", {volume: 0.1});
        this.tema.play();
        this.damage = this.sound.add("disparo", {
            loop: false,
            volume: 1,
        });
        this.relando = this.sound.add("life", {
            loop: false,
            volume: 1,
        });

        this.dest = this.sound.add("destruct", {
            loop: false,
            volume: 1,
        });
        this.muni = this.sound.add("recarga", {
            loop: false,
            volume: 1,
        });

        
    }


    update() {
    // --------------------HUD--------------------------------
        this.textTela.setText([

            '     HUD' + '\n' +
            'Tiros: ' + this.tiro 
            + '\n' + 'Vida: ' + this.vidas
            + '\n' + 'Inimigos: ' + this.inimigos 
            + '\n' + 'Tempo: ' + (120 - this.tempo)  
        ]);
    // ----------- variaveis/fisica player -------------------------
        var permitiro = true;   
        this.player.body.velocity.set(0);
        this.player.body.acceleration.set(0);
        this.player.setAngle(0);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.ladoTiro = 500;

    // -------- player movimentacaes ----------------------------
        if (this.cursors.left.isDown) {
          this.ladoTiro = -500;
          this.player.body.setVelocityX(-250);
          this.player.setAngle(-180);
        } else if (this.cursors.right.isDown) {
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
      
        
    //-------------------------- disparos/Ataques ---------------------------------------
      
        if(this.cursors.space.isDown && this.playerPodeAtirar == 1 && permitiro == true){ 
            this.bala = this.physics.add.sprite(this.player.x+37, this.player.y+5, 'bullet');
            this.bala.setVelocityX(this.ladoTiro);
            this.damage.play();
            this.playerPodeAtirar = 0; 
            this.ataque = true;      
            this.tiro -=1;
          if (this.tiro < 1){
            this.playerPodeAtirar = 0;
          }   
        }

        if(this.cursors.space.isUp && this.tiro > 0){
            this.playerPodeAtirar = 1;
        }

        if (this.tempo == this.timer){
            if(this.o1 == 0){
                this.balaOV = this.physics.add.sprite(this.ovni1.x, this.ovni1.y, 'bullet');
                this.balaOV.setVelocityX(-400);
            }
            if(this.o2 == 0){
                this.balaOV = this.physics.add.sprite(this.ovni2.x, this.ovni2.y, 'bullet');
                this.balaOV.setVelocityX(-400);
            }
            if(this.o3 == 0){
                this.balaOV = this.physics.add.sprite(this.ovni3.x, this.ovni3.y, 'bullet');
                this.balaOV.setVelocityX(-400);
            }
            if(this.o4 == 0){
                this.balaOV = this.physics.add.sprite(this.ovni4.x, this.ovni4.y, 'bullet');
                this.balaOV.setVelocityX(-400);
            }
            if(this.o5 == 0){
                this.balaOV = this.physics.add.sprite(this.ovni5.x, this.ovni5.y, 'bullet');
                this.balaOV.setVelocityX(-400);
            }
            if(this.o6 == 0){
                this.balaOV = this.physics.add.sprite(this.ovni6.x, this.ovni6.y, 'bullet');
                this.balaOV.setVelocityX(-400);
            }
            if(this.o7 == 0){
                this.balaOV = this.physics.add.sprite(this.ovni7.x, this.ovni7.y, 'bullet');
                this.balaOV.setVelocityX(-400);
            }
            if(this.o8 == 0){
                this.balaOV = this.physics.add.sprite(this.ovni8.x, this.ovni8.y, 'bullet');
                this.balaOV.setVelocityX(-400);
            }
            if(this.o9 == 0){
                this.balaOV = this.physics.add.sprite(this.ovni9.x, this.ovni9.y, 'bullet');
                this.balaOV.setVelocityX(-400);
            }
            if(this.o10 == 0){
                this.balaOV = this.physics.add.sprite(this.ovni10.x, this.ovni10.y, 'bullet');
                this.balaOV.setVelocityX(-400);
            }
            if(this.o11 == 0){
                this.balaOV = this.physics.add.sprite(this.ovni11.x, this.ovni12.y, 'bullet');
                this.balaOV.setVelocityX(-500);
            }
            if(this.o12 == 0){
                this.balaOV = this.physics.add.sprite(this.ovni12.x, this.ovni12.y, 'bullet');
                this.balaOV.setVelocityX(-500);
            }
            if(this.o13 == 0){
                this.balaOV = this.physics.add.sprite(this.ovni13.x, this.ovni13.y, 'bullet');
                this.balaOV.setVelocityX(-500);
            }

            this.timer = this.tempo - 2;
        }

        
    // ----------------------- colisao do tiro com os inimigos -----------------------------------
        this.physics.add.collider(this.balaOV, this.player, this.hit, null, this);
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
        this.physics.add.collider(this.bala, this.ovni13, this.kill, null, this);
        this.physics.add.collider(this.life, this.player, this.ganhaVida, null, this);        
        this.physics.add.collider(this.ammo2, this.player, this.ganhaBala, null, this);
        this.physics.add.collider(this.ammo1, this.player, this.ganhaBala, null, this);
        this.physics.add.collider(this.bala, this.ground2, this.someBala, null, this);
        this.physics.add.collider(this.balaOV, this.ground2, this.someBala, null, this);

        this.tempo = this.contador.repeatCount;
        //this.txtTempo.text = this.contador.repeatCount;
    
    // ---------------------- Condicoes de termino -------------------------------
        if(this.inimigos == 0){
            this.player.disableBody(true, true);
            this.tiro = 10;
            this.vidas = 1;
            this.tema.stop();
            this.scene.start("EndGame");

        }

        if(this.vidas == 0 | this.tempo == 0 ){
            this.player.disableBody(true, true);
            
            this.tiro = 10;
            this.vidas = 1;
            this.tema.stop();
            this.scene.start("EndGame");
        }

        if((120 - this.tempo) == 119){
            this.player.disableBody(true, true);
            this.tiro = 10;
            this.vidas = 1;
            this.tema.stop();
            this.scene.start("EndGame");

        }
    }

    //------------- Funcoes -------------------------

    hitDeath = function (bala, ovni){
        this.dest.play();
        ovni.destroy();
        bala.destroy();
        this.inimigos -= 1;
        /*kabum.disableBody(true,true);
        player.anims.play('turn');
        gameOver = true;*/
        if (ovni == this.ovni1){
            if (this.o1 == 0){
                this.o4 = 0;
            }
            this.o1 = 1;
        }
        if (ovni == this.ovni2){
            if (this.o2 == 0){
                this.o5 = 0;
            }
            this.o2 = 1;
        }
        if (ovni == this.ovni3){
            if (this.o3 == 0){
                this.o6 = 0;
            }
            this.o3 = 1;
            
        }
        if (ovni == this.ovni4){
            if (this.o4 == 0){
                this.o7 = 0;
            }
            this.o4 = 1;
        }
        if (ovni == this.ovni5){
            if (this.o5 == 0){
                this.o8 = 0;
            }
            this.o5 = 1;
        }
        if (ovni == this.ovni6){
            if (this.o6 == 0){
                this.o9 = 0;
            }
            this.o6 = 1;
        }
        if (ovni == this.ovni7){
            this.o7 = 1;
        }
        if (ovni == this.ovni8){
            if (this.o8 == 0){
                this.o10 = 0;
            }
            this.o8 = 1;
            
        }
        if (ovni == this.ovni9){
            this.o9 = 1;
        }
        if (ovni == this.ovni10){
            this.o10 = 1;
        }
        /*kabum.disableBody(true,true);
        player.anims.play('turn');
        gameOver = true;*/
      
    }
    ganhaBala = function(ammo){
        this.muni.play();
        this.tiro += 18;
        ammo.disableBody(true,true);
    }

    hit = function(ammo){
        ammo.destroy();
        this.dest.play();
        this.vidas -= 1;
        
    }
      
    someBala = function(ammo){
        ammo.destroy();
    }

    ganhaVida = function(med){
        this.relando.play();
        this.vidas += 1;
        med.destroy();
    }
      
    kill = function(bala,ovni){
        bala.destroy(); 
        ovni.body.setVelocity(0);
        ovni.body.acceleration.set(0)
        if (ovni == this.ovni11){
            this.bossVida1 -= 1;
            if (this.bossVida1 == 0){
                ovni.destroy();
                this.o11 = 1;
                this.o12 = 0 
                this.dest.play();
                this.inimigos -= 1;   
            } 
        }
        if (ovni == this.ovni12){
            this.bossVida2 -= 1;
            if (this.bossVida2 == 0){
                ovni.destroy();
                this.o12 = 1;
                this.o13 = 0;  
                this.dest.play();
                this.inimigos -= 1;   
            }  
        }
        if (ovni == this.ovni13){
            this.bossVida3 -= 1;
            if (this.bossVida3 == 0){
                ovni.destroy();
                this.o13 = 1; 
                this.dest.play();
                this.inimigos -= 1;   
            }  
        }
    }
}